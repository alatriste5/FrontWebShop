import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {UserDto} from "../../../shared/models/models/UserDto";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tempUser: UserDto;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.tempUser = new UserDto;
  }

  onSubmit(form: NgForm){
    this.tempUser.username = form.value.username;;
    this.tempUser.password = form.value.password;

    this.authService.login(this.tempUser).subscribe(
      res => {
        localStorage.setItem("UserData",JSON.stringify(res));
        this.router.navigate(['products']);

      },
      error1 => {
        console.log(error1);
        this.error = error1;
      }
    )


    form.reset();
  }

  switchToSignUp(){
    this.router.navigate(['auth/signup']);
  }

}


