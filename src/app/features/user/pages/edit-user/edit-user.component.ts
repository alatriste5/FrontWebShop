import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../shared/services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../../../../shared/models/models/UserDto";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  destroy2$: Subject<boolean> = new Subject<boolean>();
  userForm: FormGroup;
  id: number;
  tempUser: UserDto;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tempUser = new UserDto();

    this.id = +this.route.snapshot.paramMap.get("id");

    this.getUserData();
  }

  private getUserData(){
    this.userService.getUser(this.id).pipe(takeUntil(this.destroy$)).subscribe(
      res=>{
        this.tempUser = res;
        console.log(res);
        this.initForm();
      },
      error => {
        console.log(error);
      }
    );
  }

  private initForm() {
    this.userForm = this.fb.group({
      id: [this.tempUser.id, Validators.required],
      username: [this.tempUser.username, Validators.required],
      name: [this.tempUser.name, Validators.required],
      password: ['', Validators.required],
      email: [this.tempUser.email, Validators.required]
    });

  }

  onSubmit(){
    this.userService.updateUser(this.userForm.value).pipe(takeUntil(this.destroy2$)).subscribe(
      res => {
        console.log(this.userForm.value);
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
    //TODO: Kiüríteni a password mezőt
    //TODO: Show error message
  }
}
