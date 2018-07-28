import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../core/common/material-components.module";
import {PageModule} from "../../core/common/page/page.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {MaintenanceComponent} from "./maintenance.component";
import {MaintenanceRoutingModule} from "./maintenance-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaintenanceRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [MaintenanceComponent],
  providers: [ ],
  exports: [MaintenanceComponent]

})
export class MaintenanceModule { }
