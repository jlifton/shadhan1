import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../core/common/material-components.module";
import {PageModule} from "../../core/common/page/page.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {HebrewhelpRoutingModule} from './hebrewhelp-routing.module';
import {HebrewhelpComponent} from './hebrewhelp.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HebrewhelpRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [HebrewhelpComponent],
  providers: [ ],
  exports: [HebrewhelpComponent]

})
export class HebrewhelpModule { }
