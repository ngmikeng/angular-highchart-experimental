import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { DefaultChartService } from './services/default-chart.service';
import { MultiLinesChartService } from './services/multi-lines-chart.service';
import { MultiLinesChartComponent } from './components/multi-lines-chart/multi-lines-chart.component';
import { MultiLinesNavigatorChartComponent } from './components/multi-lines-navigator-chart/multi-lines-navigator-chart.component';
import { MultiLinesNavigatorChartService } from './services/multi-lines-navigator-chart.service';

@NgModule({
  declarations: [
    MultiLinesChartComponent,
    MultiLinesNavigatorChartComponent
  ],
  imports: [
    HighchartsChartModule
  ],
  exports: [
    MultiLinesChartComponent,
    MultiLinesNavigatorChartComponent,
    HighchartsChartModule
  ]
})
export class ChartsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ChartsModule,
      providers: [
        DefaultChartService,
        MultiLinesChartService,
        MultiLinesNavigatorChartService
      ],
    };
  }
}
