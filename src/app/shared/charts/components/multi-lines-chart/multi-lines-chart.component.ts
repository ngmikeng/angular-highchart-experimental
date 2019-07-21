import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import noData from 'highcharts/modules/no-data-to-display';
noData(Highcharts);
import { MultiLinesChartService } from '../../services/multi-lines-chart.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const MOCK_DATA: any = [{
  "id": "data sample",
  "name": "Data sample",
  "type": "line",
  "data": [
    { "x": 0, "y": 0},
    { "x": 0.016666666666666666, "y": 0},
    { "x": 0.03333333333333333, "y": 0},
    { "x": 0.05, "y": 0},
    { "x": 0.06666666666666667, "y": 0},
    { "x": 0.08333333333333333, "y": 0},
    { "x": 0.1, "y": 0},
    { "x": 0.11666666666666667, "y": 0},
    { "x": 0.13333333333333333, "y": 0},
    { "x": 0.15, "y": 0},
    { "x": 0.16666666666666666, "y": 0},
    { "x": 0.18333333333333332, "y": 0}, { "x": 0.2, "y": 0}, { "x": 0.21666666666666667, "y": 0}, { "x": 0.23333333333333334, "y": 0}, { "x": 0.25, "y": 0}, { "x": 0.26666666666666666, "y": 0}, { "x": 0.2833333333333333, "y": 0}, { "x": 0.3, "y": 0}, { "x": 0.31666666666666665, "y": 0}, { "x": 0.3333333333333333, "y": 0}, { "x": 0.35, "y": 0}, { "x": 0.36666666666666664, "y": 0}, { "x": 0.38333333333333336, "y": 0}, { "x": 0.4, "y": 0}, { "x": 0.4166666666666667, "y": 0}, { "x": 0.43333333333333335, "y": 0}, { "x": 0.45, "y": 0}, { "x": 0.4666666666666667, "y": 0}, { "x": 0.48333333333333334, "y": 0}, { "x": 0.5, "y": 0}, { "x": 0.5166666666666667, "y": 0}, { "x": 0.5333333333333333, "y": 0}, { "x": 0.55, "y": 0}, { "x": 0.5666666666666667, "y": 0}, { "x": 0.5833333333333334, "y": 0}, { "x": 0.6, "y": 0}, { "x": 0.6166666666666667, "y": 0}, { "x": 0.6333333333333333, "y": 0}]
}];

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

  constructor(
    private multiLinesChartService: MultiLinesChartService
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

  initChart() {
    this.chartOptions = this.multiLinesChartService.getChartOptions();
  }

  chartInstanceHandler(chart) {
    this.chartInstance = chart;

    const xAxisOptions = this.multiLinesChartService.getXAxisOption([
      { min: 0, max: 15 }
    ]);
    xAxisOptions.forEach(yAxis => {
      this.chartInstance.addAxis(yAxis, true);
    });

    const yAxisOptions = this.multiLinesChartService.getYAxisOption([
      {
        name: 'Axis Y 1',
        min: null,
        max: null
      },
      {
        name: 'Axis Y 2',
        min: null,
        max: null
      },
      {
        name: 'Axis Y 3',
        min: null,
        max: null,
        opposite: true,
      }
    ]);
    yAxisOptions.forEach(yAxis => {
      this.chartInstance.addAxis(yAxis, false);
    });

    this.loadChartData().subscribe(() => {

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

  loadChartData() {
    const observer = of(null);
    if (this.chartInstance) {
      let seriesData = MOCK_DATA;
      seriesData.forEach(series => {
        this.chartInstance.addSeries(series, false, false);
      });
      this.chartInstance.redraw();
    }
    return observer.pipe(
      delay(200)
    );
  }

}
