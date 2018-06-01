import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsTableComponent } from './operators-table.component';

const routes: Routes = [
  {
    path: '',
    component: OperatorsTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorsTableRoutingModule {
}
