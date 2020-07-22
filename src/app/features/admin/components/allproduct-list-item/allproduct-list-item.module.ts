import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AllproductListItemComponent} from "./allproduct-list-item.component";


@NgModule({
  declarations: [AllproductListItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[AllproductListItemComponent]
})
export class AllproductListItemModule {



}
