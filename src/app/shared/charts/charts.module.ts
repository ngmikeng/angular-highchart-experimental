import { NgModule, ModuleWithProviders } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { DefaultChartService } from './services/default-chart.service';
import { MultiLinesChartService } from './services/multi-lines-chart.service';
import { MultiLinesChartComponent } from './components/multi-lines-chart/multi-lines-chart.component';

@NgModule({
  declarations: [
    MultiLinesChartComponent
  ],
  imports: [
    HighchartsChartModule
  ],
  exports: [
    MultiLinesChartComponent,
    HighchartsChartModule
  ]
})
export class ChartsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ChartsModule,
      providers: [
        DefaultChartService,
        MultiLinesChartService
      ],
    };
  }
}
