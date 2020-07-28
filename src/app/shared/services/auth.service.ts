import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {UserDto} from "../models/models/UserDto";
import {addressDto} from "../models/models/addressDto";
import {Observable, Subject, throwError} from "rxjs";
import {activeUser} from "../models/models/activeUser.model";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  activeUser = new Subject<activeUser>();
  curractiveUser: activeUser;

  constructor(private http: HttpClient,
              private router: Router) {}

  login(user: UserDto){
    return this.http.post<AuthResponseData>('http://localhost:8080/authentication/login', user).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.id,resData.username,resData.name,resData.email,resData.addressId,resData.role,resData.token);
      })
    );
  }

  //There is not need to check token, because if someone want to login he don't have token
  logout(){
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser != null){
      localStorage.clear();

      return this.http.post('http://localhost:8080/authentication/logout/?',null,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        });

      //this.router.navigate(['auth/login']);
    }
    else {
      //this.router.navigate(['']);
    }
  }

  //There 3 method not need to check token, because when someone want to signup he don't have token
  signupuser(user: UserDto): Observable<UserDto>{
    return this.http.post<UserDto>('http://localhost:8080/users',user);
  }
  signupaddress(address: addressDto): Observable<number>{
    return this.http.post<number>('http://localhost:8080/address',address);
  }
  updateUserAddressId(user: UserDto): Observable<boolean>{ //Set the addressid in user
    return this.http.post<boolean>('http://localhost:8080/users/updatebyusername',user);
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
      //console.log("Nincs belepett user");
      this.router.navigate(['auth/login']);
    } else {
      return this.http.get<addressDto>('http://localhost:8080/address/' + id,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        });
    }
  }

  updateUser(user: UserDto): Observable<boolean>{
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser == null) {
      //console.log("There is no logged in user");
      this.router.navigate(['auth/login']);
    } else if((this.curractiveUser.role != 'Admin') && (this.curractiveUser.id != user.id)) {
      //console.log("The logged in user not admin or he don't want to see own datas");
      this.router.navigate(['home']);
    }
    else {
      //console.log("The user is admin or the user want to see own datas");
      return this.http.post<boolean>('http://localhost:8080/users/update',user,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      ).pipe(tap(
        res => {
          this.handleAuthentication(user.id, user.username, user.name, user.email, user.addressid, user.role, this.curractiveUser.token);
        }
      ));

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



  private handleAuthentication(id: number, username: string, name: string, email: string,
                               addressid: number, role: string, token: string){
    const activeUser1 = new activeUser(
      id,
      username,
      name,
      email,
      addressid,
      role,
      token);
    this.activeUser.next(activeUser1);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}
interface AuthResponseData {
  id: number;
  username: string;
  name: string;
  email: string;
  addressId: number;
  role: string;
  token: string;
}
