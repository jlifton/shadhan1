import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../core/common/material-components.module";
import {PageModule} from "../../core/common/page/page.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {ArchiveComponent} from "./archive.component";
import {ArchiveRoutingModule} from "./archive-routing.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ArchiveRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [ArchiveComponent],
  providers: [ ],
  exports: [ArchiveComponent]
})
export class ArchiveModule {}

