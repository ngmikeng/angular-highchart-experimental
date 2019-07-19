import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLinesChartService } from './services/multi-lines-chart.service';
import { MultiLinesChartComponent } from './components/multi-lines-chart/multi-lines-chart.component';

@NgModule({
  declarations: [
    MultiLinesChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MultiLinesChartComponent
  ]
})
export class ChartsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ChartsModule,
      providers: [
        MultiLinesChartService
      ],
    };
  }
}
