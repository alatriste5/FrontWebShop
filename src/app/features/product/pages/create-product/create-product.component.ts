import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../shared/services/product.service";
import {ProductDto} from "../../../../shared/models/models/productDto";
import {catchError, concatMap, map, takeUntil, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserDto} from "../../../../shared/models/models/UserDto";
import {activeUser} from "../../../../shared/models/models/activeUser.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  id: number;
  editMode = false;
  productForm: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  tempProductDto: ProductDto;
  tempUserDto: UserDto;
  curractiveUser: activeUser;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
      this.initForm();

    });
  }
  private initForm(){
    let productid = null;
    let productname = '';
    let productprice = null;
    let productdetails = '';
    let productimage = '';
    let productseller = this.curractiveUser.id;

    if(this.editMode){
      const product = this.productService.getProduct(this.id).pipe(
        takeUntil(this.destroy$),
        concatMap(res => {
          this.tempProductDto = res;
          return this.productService.getUsername(this.tempProductDto.sellerid)
        }),
      ).subscribe(
        res2 =>{
          this.tempUserDto = res2;

          productid = this.tempProductDto.id;
          productname = this.tempProductDto.name;
          productprice = this.tempProductDto.price;
          productdetails = this.tempProductDto.details;
          productimage = this.tempProductDto.image;

          this.productForm = new FormGroup({
            id: new FormControl(productid, Validators.required),
            name: new FormControl(productname, Validators.required),
            price: new FormControl(productprice, Validators.required),
            details: new FormControl(productdetails, Validators.required),
            image: new FormControl(productimage, Validators.required),
            sellerid: new FormControl(productseller, Validators.required)
          });
        }
      );
    }

    //New product
    this.productForm = new FormGroup({
      id: new FormControl(productid),
      name: new FormControl(productname, Validators.required),
      price: new FormControl(productprice, Validators.required),
      details: new FormControl(productdetails, Validators.required),
      image: new FormControl(productimage, Validators.required),
      sellerid: new FormControl(productseller, Validators.required)
    });
  }

  onSubmit() {
    if(!this.editMode) {
      //console.log(this.productForm.value);
      this.productService.addProduct(this.productForm.value).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          this.onCancel();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.productService.updateProduct(this.productForm.value)
        .subscribe(
        res => {
          console.log(res);
          this.onCancel();
        },
        error => {
          console.log("Create-product - updateProduct error");
          console.log(error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['products']).then(() => {
      window.location.reload();
    });
  }
}
