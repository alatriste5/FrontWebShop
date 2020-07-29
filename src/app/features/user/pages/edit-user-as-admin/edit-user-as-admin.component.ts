import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from "../../../../shared/models/models/UserDto";
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-edit-user-as-admin',
  templateUrl: './edit-user-as-admin.component.html',
  styleUrls: ['./edit-user-as-admin.component.scss']
})
export class EditUserAsAdminComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  userForm: FormGroup;
  id: number;

  curractiveUser: UserDto;
  isadmin = false;

  changesuccess = false;
  changeerror = false;
  errormessage = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      id: [null],
      password: ['', Validators.required]
    });

    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if (this.curractiveUser.role == 'Admin') {
      this.isadmin = true;
    }

    this.id = +this.route.snapshot.paramMap.get("id");

    this.getUserData();
  }

  private getUserData() {
    this.userService.getUser(this.id).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.initForm(res);

      },
      error => {
        console.log(error);
      }
    );
  }

  private initForm(res: any) {
    this.userForm.patchValue({
      username: res.username,
      name: res.name,
      email: res.email,
      role: res.role,
      id: res.id
    });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    //console.log(this.userForm.value);
    this.authService.updateUserAsAdmin(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.changesuccess = true;

        setTimeout(() => {
          this.changesuccess = false;
          this.router.navigate(['users/'+this.curractiveUser.id]);

        }, 3000);
      },
      error => {
        console.log(error);
        this.errormessage = error.error;

        this.changeerror = true;

        setTimeout(() => {
          this.changeerror = false;
          this.errormessage = null;

        }, 10000);
      }
    );
  }
}
