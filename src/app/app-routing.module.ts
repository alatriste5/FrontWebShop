import {HomeComponent} from './features/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateProductComponent} from "./features/product/pages/create-product/create-product.component";
import {ProductItemComponent} from "./features/product/pages/product-item/product-item.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {SignupComponent} from "./features/auth/signup/signup.component";
import {CreateAddressComponent} from "./features/address/pages/create-address/create-address.component";
import {UserListComponent} from "./features/user/pages/user-list/user-list.component";
import {UserItemComponent} from "./features/user/pages/user-item/user-item.component";
import {EditUserComponent} from "./features/user/pages/edit-user/edit-user.component";
import {AllproductListComponent} from "./features/admin/pages/allproduct-list/allproduct-list.component";
import {AllProductsComponent} from "./features/product/pages/all-products/all-products.component";
import {SoldProductsComponent} from "./features/product/pages/sold-products/sold-products.component";
import {MyProductsComponent} from "./features/product/pages/my-products/my-products.component";
import {MyPurchasesComponent} from "./features/product/pages/my-purchases/my-purchases.component";
import {EditUserAsAdminComponent} from "./features/user/pages/edit-user-as-admin/edit-user-as-admin.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  {path: 'products', component: AllProductsComponent},
  {path: 'products/create', component: CreateProductComponent},
  {path: 'products/sold', component: SoldProductsComponent},
  {path: 'products/myproducts/:id', component: MyProductsComponent},
  {path: 'products/mypurchases/:id', component: MyPurchasesComponent},
  {path: 'products/:id', component: ProductItemComponent},
  {path: 'products/edit/:id', component: CreateProductComponent},

  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'address/add', component: CreateAddressComponent},
  {path: 'address/add/:id', component: CreateAddressComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/:id', component: UserItemComponent},
  {path: 'users/edit/:id', component: EditUserComponent},
  {path: 'users/editasadmin/:id', component: EditUserAsAdminComponent},
  {path: 'admin/productlist', component:AllproductListComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
