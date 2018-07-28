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
import {ListModule} from "../../../core/common/list/list.module";
import { SingleDialogComponent } from './single-dialog/single-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SinglesTableRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatSortModule,
    ReactiveFormsModule,
    ListModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [SinglesTableComponent, SingleDialogComponent],
  providers: [SinglesService],
  exports: [SinglesTableComponent],
  entryComponents: [SingleDialogComponent]
})
export class SinglesTableModule { }

