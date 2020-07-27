import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../models/models/UserDto";
import {activeUser} from "../models/models/activeUser.model";
import {Router} from "@angular/router";

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
      //console.log("Nincs belepett user");
      this.router.navigate(['auth/login']);
    } else if(this.curractiveUser.role != 'Admin'){
      //console.log("Van belepett user, de o nem admin");
      this.router.navigate(['home']);
    } else {
      //console.log("A belepett user admin");
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


}
