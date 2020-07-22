import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListItemComponent} from "./user-list-item.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [UserListItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [UserListItemComponent]
})
export class UserListItemModule { }
