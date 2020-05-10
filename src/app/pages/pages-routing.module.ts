import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartMultiLinesComponent } from './chart-multi-lines/chart-multi-lines.component';
import { ChartMultiLinesNavigatorComponent } from './chart-multi-lines-navigator/chart-multi-lines-navigator.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'chart-multi-lines',
        component: ChartMultiLinesComponent
      },
      {
        path: 'chart-multi-lines-navigator',
        component: ChartMultiLinesNavigatorComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
