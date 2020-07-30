import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserDto} from "../../../shared/models/models/UserDto";
import {concatMap, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {addressDto} from "../../../shared/models/models/addressDto";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  tempUser: UserDto;
  changeerror = false;
  errormessage = null;


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.tempUser = new UserDto;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(form: NgForm){
    const psw1 = form.value.password;
    const psw2 = form.value.password2;

    if(psw1 == psw2){
      this.tempUser.username = form.value.username;
      this.tempUser.name = form.value.name;
      this.tempUser.email = form.value.email;
      this.tempUser.password = form.value.password;
      this.signup();
      form.reset();
    } else {

      this.errormessage = "The passwords did not match!";
      this.changeerror = true;

      setTimeout(() => {
        this.changeerror = false;
        this.errormessage = null;
        window.location.reload();

      }, 6000);

    }
  }

  private signup(){
    this.authService.signupuser(this.tempUser).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        localStorage.setItem('newusername', this.tempUser.username);
        this.router.navigate(['address/add']);
      },
      error => {
        console.log("Error user");
        console.log(error);

        this.errormessage = error.error;
        this.changeerror = true;

        setTimeout(() => {
          this.changeerror = false;
          this.errormessage = null;
          window.location.reload();

        }, 6000);
      }
    );

  }

}
