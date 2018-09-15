import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HebrewhelpComponent} from './hebrewhelp.component';

const routes: Routes = [
  {
    path: '',
    component: HebrewhelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HebrewhelpRoutingModule {
}
