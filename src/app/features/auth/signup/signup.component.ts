import { Component, OnInit } from '@angular/core';
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
export class SignupComponent implements OnInit {
  error: string = null;

  destroy$: Subject<boolean> = new Subject<boolean>();
  tempUser: UserDto;


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.tempUser = new UserDto;
  }

  onSubmit(form: NgForm){
    this.error = null;
    if(form.value.password == form.value.password2){
      this.tempUser.username = form.value.username;
      this.tempUser.name = form.value.name;
      this.tempUser.email = form.value.email;
      this.tempUser.password = form.value.password;
      this.signup();
      form.reset();
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
        this.error = JSON.stringify(error.error);
      }
    );

  }

}
