import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartMultiLinesComponent } from './chart-multi-lines/chart-multi-lines.component';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, ChartMultiLinesComponent],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
