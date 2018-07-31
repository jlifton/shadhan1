import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatSortModule} from '@angular/material';
import {BreadcrumbsModule} from '../../../core/breadcrumbs/breadcrumbs.module';
import {MaterialModule} from '../../../core/common/material-components.module';
import {ListModule} from '../../../core/common/list/list.module';
import {PageModule} from '../../../core/common/page/page.module';
import {ArchivesTableComponent} from './archives-table.component';
import {ArchivesTableRoutingModule} from './archives-table-routing.module';
import { ArchiveDialogComponent } from './archive-dialog/archive-dialog.component';
import {SinglesService} from '../../singles/singles-table/singles.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ArchivesTableRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatSortModule,
    ReactiveFormsModule,
    ListModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [ArchivesTableComponent, ArchiveDialogComponent],//, ArchiveDialogComponent],
  providers: [SinglesService],
  exports: [ArchivesTableComponent],
  entryComponents: [ArchiveDialogComponent]
})
export class ArchivesTableModule { }
