import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import {AuthGuardService} from "./shadhan/auth/auth.service";

const routes: Routes = [
  {
    path: 'login',
    //loadChildren: 'app/demo/custom-pages/login/login.module#LoginModule',
    loadChildren: 'app/shadhan/login/login.module#LoginModule',
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: LayoutComponent,
    children: [
      {
        path: '',
        //loadChildren: 'app/demo/dashboard/dashboard.module#DashboardModule',
        loadChildren: 'app/shadhan/singles/singles-table/singles-table.module#SinglesTableModule',
        pathMatch: 'full'
      },
      {
        path: 'operators/operators-table',
        canActivate: [AuthGuardService],
        loadChildren: 'app/shadhan/operators/operators-table/operators-table.module#OperatorsTableModule',
      },
      {
        path: 'singles/singles-table',
        //canActivate: [AuthGuardService],
        loadChildren: 'app/shadhan/singles/singles-table/singles-table.module#SinglesTableModule',
      },
      {
        path: 'archive',
        //canActivate: [AuthGuardService],
        //loadChildren: 'app/shadhan/archive/archive.module#ArchiveModule',
        loadChildren: 'app/shadhan/archives/archives-table/archives-table.module#ArchivesTableModule'
      },
      {
        path: 'maintenance',
        //canActivate: [AuthGuardService],
        loadChildren: 'app/shadhan/maintenance/maintenance.module#MaintenanceModule',
      },
      {
        path: 'hebrewhelp',
        //canActivate: [AuthGuardService],
        loadChildren: 'app/shadhan/hebrewhelp/hebrewhelp.module#HebrewhelpModule',
      },
      {
        path: 'password',
        //canActivate: [AuthGuardService],
        loadChildren: 'app/shadhan/password/password.module#PasswordModule',
      },
      {
        path: 'contact',
        //canActivate: [AuthGuardService],
        loadChildren: 'app/shadhan/contact/contact.module#ContactModule',
      },
      {
        path: 'about',
        //canActivate: [AuthGuardService],
        loadChildren: 'app/shadhan/about/about.module#AboutModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {
}
