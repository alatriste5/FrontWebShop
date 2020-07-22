import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ProductListComponent} from './pages/product-list/product-list.component';
import {RouterModule} from "@angular/router";
import {ProductItemComponent} from "./pages/product-item/product-item.component";
import {ProductListItemModule} from "./components/product-list-item/product-list-item.module";

@NgModule({
  declarations: [CreateProductComponent, ProductItemComponent, ProductListComponent,],
  imports: [CommonModule,
    ReactiveFormsModule, RouterModule, ProductListItemModule],
  exports: [CreateProductComponent,ProductItemComponent, ProductListComponent,]
})
export class ProductModule {
}
