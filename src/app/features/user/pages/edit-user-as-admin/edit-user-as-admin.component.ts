import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from "../../../../shared/models/models/UserDto";
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
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
  successmessage = null;
  errormessage = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
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
    if(confirm("Are you sure to update this user?")) {
      this.userService.updateUserAsAdmin(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          this.changesuccess = true;
          this.successmessage = "Successfully updated";

          setTimeout(() => {
            this.successmessage = null;
            this.changesuccess = false;
            this.router.navigate(['users/' + this.id]);

          }, 3000);
        },
        error => {
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

  onDelete(){
    if(confirm("Are you sure to delete this user?")) {
      this.userService.deleteUser(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(
        res => {

          this.changesuccess = true;
          this.successmessage = "Successfully delete";

          setTimeout(() => {
            this.successmessage = null;
            this.changesuccess = false;
            this.router.navigate(['users/'+this.id]);

          }, 3000);

          this.router.navigate(['users']);
        }, error => {
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
}
