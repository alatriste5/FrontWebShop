import { HeaderModule } from './shared/components/header/header.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductModule} from "./features/product/product.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { CreateAddressComponent } from './features/address/pages/create-address/create-address.component';
import {UserModule} from "./features/user/user.module";
import {AdminModule} from "./features/admin/admin.module";
import {DropdownDirective} from "./shared/dropdown.directive";


@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, CreateAddressComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    HeaderModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ProductModule,
    AdminModule,
    UserModule,
    CommonModule,
    FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
