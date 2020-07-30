import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {concatMap, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {UserDto} from "../../../../shared/models/models/UserDto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../../../shared/services/product.service";
import {UserService} from "../../../../shared/services/user.service";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  addressForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  tempUser: UserDto; //Used for update a new user addressid. This is used to know what is the id of the just signed up user

  changesuccess = false;
  changeerror = false;

  constructor(private productService: ProductService,
              private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tempUser = new UserDto;

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    this.addressForm = new FormGroup({
      country: new FormControl('', Validators.required),
      postcode: new FormControl(null, Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      house: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })

    if (this.editMode) {
      this.patchForm();
    }
  }

  private patchForm() {
    this.userService.getAddress(this.id).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.addressForm.patchValue({
          country: res.country,
          postcode: res.postcode,
          city: res.city,
          street: res.street,
          house: res.house,
          id: res.id
        });

      },
      error1 => {
        console.log("getAddress error");
        console.log(error1);
      }
    );
  }

  onSubmit() {
    //Create a new address
    if (!this.editMode) {
      this.addAddress();
      this.router.navigate(['auth','login']);
    }
    //Edit address
    else {
      this.updateAddress();
    }
  }

  private addAddress() {
    this.authService.signupaddress(this.addressForm.value).pipe(
      takeUntil(this.destroy$),
      concatMap(res => {
        const user = {}
        user["username"] = localStorage.getItem("newusername");
        user["addressid"] = res;
        return this.authService.updateUserAddressId(user)
      }),
    ).subscribe(
      res => {
        localStorage.removeItem("newusername");
      },
      error => {
        console.log(error);
      }
    );
  }

  private updateAddress() {
    this.userService.updateAddress(this.addressForm.value).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.changesuccess = true;

        setTimeout(() => {
          this.changesuccess = false;

        }, 2000);
      },
      error => {
        this.changeerror = true;

        setTimeout(() => {
          this.changeerror = false;

        }, 2000);
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  }
