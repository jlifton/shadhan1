import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../core/common/material-components.module";
import {PageModule} from "../../core/common/page/page.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {ContactComponent} from "./contact.component";
import {ContactRoutingModule} from "./contact-routing.module";
import {MatDialogModule, MatSortModule} from '@angular/material';
import {SystemService} from '../system/system.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PageModule,
    MatDialogModule,
    MatSortModule,
    BreadcrumbsModule
  ],
  declarations: [ContactComponent],
  providers: [SystemService ],
  exports: [ContactComponent]

})
export class ContactModule { }
