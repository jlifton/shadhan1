import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ArchivesTableComponent} from './archives-table.component';

const routes: Routes = [
  {
    path: '',
    component: ArchivesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivesTableRoutingModule {
}
