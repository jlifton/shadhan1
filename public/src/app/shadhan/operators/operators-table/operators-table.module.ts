import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OperatorsTableComponent} from "./operators-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../core/common/material-components.module";
import {OperatorsTableRoutingModule} from "./operators-table-routing.module";
import {OperatorsService} from "./operators.service";
import {BreadcrumbsModule} from "../../../core/breadcrumbs/breadcrumbs.module";
import {PageModule} from "../../../core/common/page/page.module";

@NgModule({
  imports: [
  CommonModule,
  FormsModule,
  OperatorsTableRoutingModule,
  MaterialModule,
  ReactiveFormsModule,
  PageModule,
  BreadcrumbsModule
  ],
  declarations: [OperatorsTableComponent],
  providers: [ OperatorsService ],
  exports: [OperatorsTableComponent]
})
export class OperatorsTableModule { }
