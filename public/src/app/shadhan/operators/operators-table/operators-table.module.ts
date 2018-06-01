import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OperatorsTableComponent} from "./operators-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../core/common/material-components.module";
import {OperatorsTableRoutingModule} from "./operators-table-routing.module";

@NgModule({
  imports: [
  CommonModule,
  FormsModule,
  OperatorsTableRoutingModule,
  MaterialModule,
  ReactiveFormsModule
  ],
  declarations: [OperatorsTableComponent],
  exports: [OperatorsTableComponent]
})
export class OperatorsTableModule { }
