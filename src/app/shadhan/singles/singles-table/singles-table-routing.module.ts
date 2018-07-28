import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SinglesTableComponent} from "./singles-table.component";

const routes: Routes = [
  {
    path: '',
    component: SinglesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SinglesTableRoutingModule {
}
