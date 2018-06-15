import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatSortModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SinglesTableRoutingModule} from "./singles-table-routing.module";
import {SinglesTableComponent} from "./singles-table.component";
import {PageModule} from "../../../core/common/page/page.module";
import {MaterialModule} from "../../../core/common/material-components.module";
import {BreadcrumbsModule} from "../../../core/breadcrumbs/breadcrumbs.module";
import {SinglesService} from "./singles.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SinglesTableRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatSortModule,
    ReactiveFormsModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [SinglesTableComponent],
  providers: [SinglesService],
  exports: [SinglesTableComponent]//,
  //entryComponents: [OperatorDialogComponent]
})
export class SinglesTableModule { }

