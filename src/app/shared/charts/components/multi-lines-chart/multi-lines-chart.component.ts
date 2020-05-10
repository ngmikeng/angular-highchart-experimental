import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import * as Highcharts from 'highcharts';
import noData from 'highcharts/modules/no-data-to-display';
noData(Highcharts);
import { MultiLinesChartService } from '../../services/multi-lines-chart.service';
import { IChartDataResponse } from '../../../services/api-chart-data.service';
import { AxisConfiguration } from '../../../../models/axis-configuration.model';

@Component({
  selector: 'app-multi-lines-chart',
  templateUrl: './multi-lines-chart.component.html',
  styleUrls: ['./multi-lines-chart.component.scss']
})
export class MultiLinesChartComponent implements OnInit {

  chartInstance: Highcharts.Chart;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  updateFlagChart: boolean = false;
  isLoadingChart = false;

  @Input() inputStates: {
    yAxisConfig: AxisConfiguration[],
    chartOriginData: IChartDataResponse
  };

  _yAxisData: AxisConfiguration[] = [];
  _chartOriginData: IChartDataResponse

  constructor(
    private multiLinesChartService: MultiLinesChartService,
  ) {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let changedProp = changes.inputStates;
    let to = JSON.stringify(changedProp.currentValue);
    if (changedProp.isFirstChange()) {
      console.log(`Initial value of inputStates ${to}`);
    } else {
      this._yAxisData = changedProp.currentValue.yAxisConfig;
      this._chartOriginData = changedProp.currentValue.chartOriginData;
      this.resetChartAxis(this.chartInstance);
      this.resetChartData(this.chartInstance);
      const xAxisOptions = this.multiLinesChartService.getXAxisOption([
        { min: null, max: null }
      ]);
      xAxisOptions.forEach(yAxis => {
        this.chartInstance.addAxis(yAxis, true);
      });

      const yAxisOptions = this.multiLinesChartService.getYAxisOption(this._yAxisData);
      yAxisOptions.forEach(yAxis => {
        this.chartInstance.addAxis(yAxis, false);
      });

      let seriesData = [];
      this._yAxisData.forEach((axisItem, axisIndex) => {
        const data = this.multiLinesChartService.parseSeriesData(axisItem.dataSets, axisIndex, this._chartOriginData);
        seriesData = seriesData.concat(data);
      });
      this.loadChartData(seriesData);

    }
  }

  initChart() {
    this.chartOptions = this.multiLinesChartService.getChartOptions();
  }

  chartInstanceHandler(chart) {
    this.chartInstance = chart;

    const xAxisOptions = this.multiLinesChartService.getXAxisOption([
      { min: null, max: null }
    ]);
    xAxisOptions.forEach(yAxis => {
      this.chartInstance.addAxis(yAxis, true);
    });

    const yAxisOptions = this.multiLinesChartService.getYAxisOption(this._yAxisData);
    yAxisOptions.forEach(yAxis => {
      this.chartInstance.addAxis(yAxis, false);
    });
  }

  resetChartAxis(chartInstance, isRedraw?: boolean) {
    if (chartInstance) {
      this.chartOptions.xAxis = [];
      this.chartOptions.yAxis = [];

      while (chartInstance.yAxis.length > 0) {
        chartInstance.yAxis[0].remove(false);
      }
      while (chartInstance.xAxis.length > 0) {
        chartInstance.xAxis[0].remove(false);
      }

      if (isRedraw) {
        chartInstance.redraw();
      }
    }
  }

  resetChartData(chartInstance, isRedraw?: boolean) {
    if (chartInstance) {
      this.chartOptions.series = [];
      // clear chart and reload data
      while (chartInstance.series.length > 0) {
        chartInstance.series[0].remove(false);
      }

      if (isRedraw) {
        chartInstance.redraw();
      }
    }
  }

  loadChartData(seriesData) {
    if (this.chartInstance && seriesData) {
      seriesData.forEach(series => {
        this.chartInstance.addSeries(series, false, false);
      });
      this.chartInstance.redraw();
    }
  }

}
