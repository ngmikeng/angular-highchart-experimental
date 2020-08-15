import { NgModule } from '@angular/core';
import { ChartMultiLinesComponent } from './chart-multi-lines.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ChartMultiLinesComponent],
  imports: [
    SharedModule
  ]
})
export class ChartMultiLinesModule { }
