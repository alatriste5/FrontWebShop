import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserListComponent} from "./pages/user-list/user-list.component";
import {UserListItemModule} from "./components/user-list-item/user-list-item.module";
import { UserItemComponent } from './pages/user-item/user-item.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [UserListComponent, UserItemComponent, EditUserComponent],
  imports: [CommonModule, UserListItemModule, ReactiveFormsModule],
  exports: [UserListComponent, UserItemComponent, EditUserComponent]
})

export class UserModule {

}
