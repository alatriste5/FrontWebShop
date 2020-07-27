import { UserDto } from './../models/models/UserDto';
import { ProductDto } from './../models/models/productDto';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {activeUser} from "../models/models/activeUser.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  curractiveUser: activeUser;

  constructor(private http: HttpClient,
              private router: Router) {}

  getProduct(id: number): Observable<ProductDto> {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(!(this.curractiveUser == null)){
      return this.http.get<ProductDto>('http://localhost:8080/product/' + id,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

  getValidProducts(): Observable<ProductDto[]> {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(!(this.curractiveUser == null)){
      return this.http.get<ProductDto[]>('http://localhost:8080/product/valid',
      {
        params: new HttpParams().set('auth', this.curractiveUser.token)
      }
      );
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

  getUnValidProducts(): Observable<ProductDto[]> {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(!(this.curractiveUser == null) && this.curractiveUser.role == "Admin"){
      return this.http.get<ProductDto[]>('http://localhost:8080/product/unvalid',
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

  getMyPurchase(id: number): Observable<ProductDto[]> {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(!(this.curractiveUser == null)){
      return this.http.get<ProductDto[]>('http://localhost:8080/product/purchases/'+id,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

  validateUnValidProduct(id: number) {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    return this.http.put('http://localhost:8080/product/valid/'+id,null,{
      params: new HttpParams().set('auth', this.curractiveUser.token)
    });
  }

  getSoldProducts(): Observable<ProductDto[]> {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(!(this.curractiveUser == null)) {
      return this.http.get<ProductDto[]>('http://localhost:8080/product/sold',
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

  getUsername(id: number): Observable<UserDto> {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    return this.http.get<UserDto>('http://localhost:8080/users/username/' + id,
      {
        params: new HttpParams().set('auth', this.curractiveUser.token)
      }
    );
  }

  addProduct(product: ProductDto) {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    return this.http.post('http://localhost:8080/product', product,
      {
        params: new HttpParams().set('auth', this.curractiveUser.token)
      }
    );
  }

  updateProduct(product: ProductDto) {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    return this.http.put<Response>('http://localhost:8080/product/update', product,
      {
        params: new HttpParams().set('auth', this.curractiveUser.token)
      }
    );
  }

  deleteProduct(id: number) {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    return this.http.delete('http://localhost:8080/product/delete/' + id,
      {
        params: new HttpParams().set('auth', this.curractiveUser.token)
      }
    );
  }

  getOwnValidProducts(id: number): Observable<ProductDto[]> {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    if(!(this.curractiveUser == null)){
      return this.http.get<ProductDto[]>('http://localhost:8080/product/ownvalid/' + id,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
        );
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

  sellProduct(product: ProductDto) {
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
    product.customerid = this.curractiveUser.id;
    console.log("UP Prod");
    console.log(product);
    if(!(this.curractiveUser == null)) {
      return this.http.put('http://localhost:8080/product/sell',product,
        {
          params: new HttpParams().set('auth', this.curractiveUser.token)
        }
      );
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

}
