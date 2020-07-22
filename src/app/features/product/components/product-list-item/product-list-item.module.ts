import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProductListItemComponent} from "./product-list-item.component";

@NgModule({
  declarations: [ProductListItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ProductListItemComponent]
})
export class ProductListItemModule { }
