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

  //There is not need to check token, because if someone want to login he don't have token
  login(user: UserDto){
    return this.http.post<AuthResponseData>('http://localhost:8080/authentication/login', user).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.id,resData.username,resData.name,resData.email,
          resData.addressId,resData.role,resData.token,resData.registeredIn);
      })
    );
  }

  logout(){
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(this.curractiveUser != null){

      localStorage.removeItem("UserData");

      return this.http.post('http://localhost:8080/authentication/logout/',null,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        });
    }
    else {
      window.location.reload();
    }
  }

  //There 3 method not need to check token, because when someone want to signup he don't have token
  signupuser(user: UserDto): Observable<Response>{
    return this.http.post<Response>('http://localhost:8080/users',user);
  }
  signupaddress(address: addressDto): Observable<number>{
    return this.http.post<number>('http://localhost:8080/address',address);
  }
  updateUserAddressId(user: any): Observable<boolean>{ //Set the addressid in user
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
      //console.log("No logged in user");
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
          this.handleAuthentication(user.id, user.username, user.name, user.email,
            user.addressid, user.role, this.curractiveUser.token,null);
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

  autoLogin(){
    const tempUser: {
      id: number,
      username: string,
      name: string,
      email: string,
      addressid: number,
      role: string,
      _token: string,
      registeredIn: number
    } = JSON.parse(localStorage.getItem("UserData"));

    if(!tempUser){
      return
    }

    const loadedUser = new activeUser(
      tempUser.id, tempUser.username, tempUser.name, tempUser.email, tempUser.addressid, tempUser.role, tempUser._token,
      tempUser.registeredIn
    );

    if(loadedUser.registeredIn) {
      this.activeUser.next(loadedUser);

      const expirationDuration = new Date(tempUser.registeredIn).getTime() - new Date().getTime() + 600000;
      this.autoLogout(expirationDuration);
    }

  }

  autoLogout(expirationDuration: number) {
    console.log("Auto Logout after: " + expirationDuration);
    setTimeout(() => {
      this.logout().subscribe(res => {

        window.location.reload();
        console.log("Auto logged out");
      }, error => {
        console.log("error")
      })
    }, expirationDuration);
  }


  private handleAuthentication(id: number, username: string, name: string, email: string,
                               addressid: number, role: string, token: string, registeredIn: number){
    const activeUser1 = new activeUser(
      id,
      username,
      name,
      email,
      addressid,
      role,
      token,
      registeredIn);

    this.activeUser.next(activeUser1);
    const expirationDuration = new Date(registeredIn).getTime() - new Date().getTime() + 600000;

    this.autoLogout(expirationDuration);

  }

  private handleError(errorRes: HttpErrorResponse) {
    if (errorRes.error){
      return throwError(errorRes.error);
    }
    else {
      return throwError('An unknown error occurred!');
    }
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
  registeredIn: number;
}
