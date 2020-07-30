import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../models/models/UserDto";
import {activeUser} from "../models/models/activeUser.model";
import {Router} from "@angular/router";
import {addressDto} from "../models/models/addressDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  curractiveUser: activeUser;
  constructor(private http: HttpClient,private router: Router) {
  }

  getUsers(): Observable<UserDto[]>{
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser == null) {
      //console.log("There is no logged in user");
      this.router.navigate(['auth/login']);
    } else if(this.curractiveUser.role != 'Admin'){
      //console.log("The logged in user not admin");
      this.router.navigate(['home']);
    } else {
      //console.log("The user is admin");
      return this.http.get<UserDto[]>('http://localhost:8080/users',
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
        );
      }
  }

  getUser(id: number): Observable<UserDto>{
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser == null) {
      //console.log("There is no logged in user");
      this.router.navigate(['auth/login']);
    } else if((this.curractiveUser.role != 'Admin') && (this.curractiveUser.id != id)){
      //console.log("The logged in user not admin or he don't want to see own datas");
      this.router.navigate(['home']);
    }
    else {
      //console.log("The user is admin or the user want to see own datas");
      return this.http.get<UserDto>('http://localhost:8080/users/'+id,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
  }

  deleteUser(user: UserDto): Observable<boolean>{
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser.role == 'Admin') {
      return this.http.post<boolean>('http://localhost:8080/users/delete', user,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
    else {
      this.router.navigate(['home']);
    }
  }

  updateAddress(address: addressDto): Observable<boolean>{
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    return this.http.post<boolean>('http://localhost:8080/address/update',address,
      {
        params: new HttpParams().set('auth', this.curractiveUser.token)
      });
  }

  getAddress(id: number): Observable<addressDto>{
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser == null) {
      //console.log("No logged in user");
      this.router.navigate(['auth/login']);
    } else {
      return this.http.get<addressDto>('http://localhost:8080/address/' + id,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        });
    }
  }

  updateUserAsAdmin(user: UserDto): Observable<boolean>{
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser == null) {
      //console.log("There is no logged in user");
      this.router.navigate(['auth/login']);
    } else if(this.curractiveUser.role != 'Admin') {
      //console.log("The logged in user not admin");
      this.router.navigate(['home']);
    }
    else {
      //console.log("The user is admin");
      return this.http.post<boolean>('http://localhost:8080/users/updateasadmin',user,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
  }
}
