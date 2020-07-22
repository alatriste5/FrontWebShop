import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {UserDto} from "../../../shared/models/models/UserDto";
import {activeUser} from "../../../shared/models/models/activeUser.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tempUser: UserDto;
  //destroy$: Subject<boolean> = new Subject<boolean>();
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.tempUser = new UserDto();
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


