import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AboutComponent} from "./about.component";
import {MaterialModule} from "../../core/common/material-components.module";
import {PageModule} from "../../core/common/page/page.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {AboutRoutingModule} from "./about-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AboutRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [AboutComponent],
  providers: [ ],
  exports: [AboutComponent]

})
export class AboutModule { }
