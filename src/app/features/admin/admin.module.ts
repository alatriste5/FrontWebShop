import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllproductListComponent } from './pages/allproduct-list/allproduct-list.component';
import {RouterModule} from "@angular/router";
import {AllproductListItemModule} from "./components/allproduct-list-item/allproduct-list-item.module";



@NgModule({
  declarations: [AllproductListComponent],
  imports: [
    CommonModule,
    RouterModule,
    AllproductListItemModule
  ],
  exports: [AllproductListComponent]
})
export class AdminModule { }
