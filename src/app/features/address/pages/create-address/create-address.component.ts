import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {addressDto} from "../../../../shared/models/models/addressDto";
import {concatMap, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {UserDto} from "../../../../shared/models/models/UserDto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../../../shared/services/product.service";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {

  //TODO: -- Mitől ez a hiba: formGroup expects a FormGroup instance. Please pass one in. ILLETVE Edit esetén a country miért nem tölt be?

  id: number;
  editMode = false;
  addressForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  tempUser: UserDto; //Used for update a new user addressid. This is used to know what is the id of the just signed up user

  error: string = null;
  destroy2$: Subject<boolean> = new Subject<boolean>();
  destroy3$: Subject<boolean> = new Subject<boolean>();

  tempAddress: addressDto;


  constructor(private productService: ProductService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.tempUser = new UserDto();
    this.tempAddress = new addressDto();

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    this.initForm();
  }

  private initForm() {
    let addresscountry = '';
    let addresspostcode = null;
    let addresscity = '';
    let addressstreet = '';
    let addresshouse = null;
    let addressid = null;

    if(this.editMode){
      //Edit mode
      this.authService.getAddress(this.id).pipe(takeUntil(this.destroy2$)).subscribe(
        res => {
          //console.log(res);
          this.tempAddress = res;
          //console.log(this.tempAddress);

          addresscountry = this.tempAddress.country;
          addresspostcode = this.tempAddress.postcode;
          addresscity = this.tempAddress.city;
          addressstreet = this.tempAddress.street;
          addresshouse = this.tempAddress.house;
          addressid = this.tempAddress.id;

          this.addressForm = new FormGroup({
            country: new FormControl(addresscountry, Validators.required),
            postcode: new FormControl(addresspostcode, Validators.required),
            city: new FormControl(addresscity, Validators.required),
            street: new FormControl(addressstreet, Validators.required),
            house: new FormControl(addresshouse, Validators.required),
            id: new FormControl(addressid)
          });
        },
        error1 => {
          console.log("getAddress error");
          console.log(error1);
        }
      );

    }

    else {
      //New mode
      this.addressForm = new FormGroup({
        country: new FormControl(addresscountry, Validators.required),
        postcode: new FormControl(addresspostcode, Validators.required),
        city: new FormControl(addresscity, Validators.required),
        street: new FormControl(addressstreet, Validators.required),
        house: new FormControl(addresshouse, Validators.required),
        id: new FormControl(addressid)
      })
    }

  }

  onSubmit(){
    //Create a new address
    if(!this.editMode){
      this.addAddress();
      this.router.navigate(['login']);
      //TODO Tuti működik ez?
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
        this.tempUser.username = localStorage.getItem("newusername");
        this.tempUser.addressid = res;
        return this.authService.updateUser(this.tempUser)
      }),
    ).subscribe(
      error1 => {
        console.log("error at Create-address signupaddress or updateUser");
        console.log(error1);
      }
    );
  }
  private updateAddress(){
    //console.log(this.addressForm.value);
    this.authService.updateAddress(this.addressForm.value).pipe(takeUntil(this.destroy3$)).subscribe(
      res => {
        //this.router.navigate(['home']);
        //console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
