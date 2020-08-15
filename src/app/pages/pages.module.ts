import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ChartMultiLinesNavigatorComponent } from './chart-multi-lines-navigator/chart-multi-lines-navigator.component';
import { ChartMultiLinesModule } from './chart-multi-lines/chart-multi-lines.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [PagesComponent, ChartMultiLinesNavigatorComponent],
  imports: [
    SharedModule,
    DashboardModule,
    ChartMultiLinesModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
