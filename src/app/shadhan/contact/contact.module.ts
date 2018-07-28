import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../core/common/material-components.module";
import {PageModule} from "../../core/common/page/page.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {ContactComponent} from "./contact.component";
import {ContactRoutingModule} from "./contact-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [ContactComponent],
  providers: [ ],
  exports: [ContactComponent]

})
export class ContactModule { }
