import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {RouterModule} from "@angular/router";
import {DropdownDirective} from "../../dropdown.directive";

@NgModule({
  declarations: [HeaderComponent, DropdownDirective],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
