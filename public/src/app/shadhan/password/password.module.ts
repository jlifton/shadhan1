import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../core/common/material-components.module";
import {PageModule} from "../../core/common/page/page.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {PasswordComponent} from "./password.component";
import {PasswordRoutingModule} from "./password-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [PasswordComponent],
  providers: [ ],
  exports: [PasswordComponent]

})
export class PasswordModule { }
