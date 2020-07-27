import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ProductItemComponent} from "./pages/product-item/product-item.component";
import {ProductListItemModule} from "./components/product-list-item/product-list-item.module";
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { SoldProductsComponent } from './pages/sold-products/sold-products.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { MyPurchasesComponent } from './pages/my-purchases/my-purchases.component';

@NgModule({
  declarations: [CreateProductComponent, ProductItemComponent, AllProductsComponent, SoldProductsComponent, MyProductsComponent, MyPurchasesComponent],
  imports: [CommonModule,
    ReactiveFormsModule, RouterModule, ProductListItemModule],
  exports: [CreateProductComponent,ProductItemComponent, AllProductsComponent, SoldProductsComponent, MyProductsComponent, MyPurchasesComponent]
})
export class ProductModule {
}
