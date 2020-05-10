import { Component, OnInit, ElementRef, ViewChild, SimpleChange, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import { MultiLinesNavigatorChartService } from '../../services/multi-lines-navigator-chart.service';
import { AxisConfiguration } from '../../../../models/axis-configuration.model';
import { IChartDataResponse } from '../../../services/api-chart-data.service';
HC_stock(Highcharts);

@Component({
  selector: 'app-multi-lines-navigator-chart',
  templateUrl: './multi-lines-navigator-chart.component.html',
  styleUrls: ['./multi-lines-navigator-chart.component.scss']
})
export class MultiLinesNavigatorChartComponent implements OnInit {
  highcharts: Highcharts.Chart;

  @ViewChild('chartContainer', null) chartContainerEle: ElementRef;

  @Input() inputStates: {
    yAxisConfig: AxisConfiguration[],
    chartOriginData: IChartDataResponse
  };

  constructor(
    private multiLinesNavigatorChartService: MultiLinesNavigatorChartService
  ) { }

  _yAxisData: AxisConfiguration[] = [];
  _chartOriginData: IChartDataResponse

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.chartContainerEle && this.chartContainerEle.nativeElement) {
      const chartOptions = this.multiLinesNavigatorChartService.getChartOptions();
      this.highcharts = Highcharts.stockChart(this.chartContainerEle.nativeElement, chartOptions);
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let changedProp = changes.inputStates;
    let to = JSON.stringify(changedProp.currentValue);
    if (changedProp.isFirstChange()) {
      console.log(`Initial value of inputStates ${to}`);
    } else {
      this._yAxisData = changedProp.currentValue.yAxisConfig;
      this._chartOriginData = changedProp.currentValue.chartOriginData;

      this.initChart(this._yAxisData);

    }
  }

  initChart(yAxisData = []) {
    const chartOptions = this.multiLinesNavigatorChartService.getChartOptions();
    const xAxisOptions = this.multiLinesNavigatorChartService.getXAxisOption([
      { min: null, max: null }
    ]);
    const yAxisOptions = this.multiLinesNavigatorChartService.getYAxisOption(yAxisData);

    chartOptions.xAxis = xAxisOptions;
    chartOptions.yAxis = yAxisOptions;

    let seriesData = [];
    yAxisData.forEach((axisItem, axisIndex) => {
      const data = this.multiLinesNavigatorChartService.parseSeriesData(axisItem.dataSets, axisIndex, this._chartOriginData);
      seriesData = seriesData.concat(data);
    });
    chartOptions.series = seriesData;

    if (this.chartContainerEle && this.chartContainerEle.nativeElement) {
      this.highcharts = Highcharts.stockChart(this.chartContainerEle.nativeElement, chartOptions);
    }
  }

}
