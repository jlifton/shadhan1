import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OperatorsTableComponent} from "./operators-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../core/common/material-components.module";
import {OperatorsTableRoutingModule} from "./operators-table-routing.module";
import {OperatorsService} from "./operators.service";
import {BreadcrumbsModule} from "../../../core/breadcrumbs/breadcrumbs.module";
import {PageModule} from "../../../core/common/page/page.module";
import {MatDialogModule, MatSortModule} from "@angular/material";
import { OperatorDialogComponent } from './operator-dialog/operator-dialog.component';

@NgModule({
  imports: [
  CommonModule,
  FormsModule,
  OperatorsTableRoutingModule,
  MaterialModule,
  MatDialogModule,
  MatSortModule,
  ReactiveFormsModule,
  PageModule,
  BreadcrumbsModule
  ],
  declarations: [OperatorsTableComponent, OperatorDialogComponent],
  providers: [ OperatorsService ],
  exports: [OperatorsTableComponent],
  entryComponents: [OperatorDialogComponent]
})
export class OperatorsTableModule { }
