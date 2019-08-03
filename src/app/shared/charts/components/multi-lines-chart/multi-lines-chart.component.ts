import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import noData from 'highcharts/modules/no-data-to-display';
noData(Highcharts);
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MultiLinesChartService } from '../../services/multi-lines-chart.service';
import { ApiChartDataService } from '../../../services/api-chart-data.service';

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

  yAxisData = [
    {
      name: 'Axis Y 1',
      min: null,
      max: null,
      groupItems: [
        { name: 'Data m2', mappingName: 'm2' }
      ]
    },
    {
      name: 'Axis Y 2',
      min: null,
      max: null,
      groupItems: [
        { name: 'Data m3', mappingName: 'm3' }
      ]
    },
    {
      name: 'Axis Y 3',
      min: null,
      max: null,
      opposite: true,
      groupItems: [
        { name: 'Data m4', mappingName: 'm4' },
        { name: 'Data m5', mappingName: 'm5' },
      ]
    }
  ];

  constructor(
    private multiLinesChartService: MultiLinesChartService,
    private apiChartDataService: ApiChartDataService
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
      { min: null, max: null }
    ]);
    xAxisOptions.forEach(yAxis => {
      this.chartInstance.addAxis(yAxis, true);
    });

    const yAxisOptions = this.multiLinesChartService.getYAxisOption(this.yAxisData);
    yAxisOptions.forEach(yAxis => {
      this.chartInstance.addAxis(yAxis, false);
    });

    this.apiChartDataService.getMultiLineChartData().subscribe(chartOriginData => {
      let seriesData = [];
      this.yAxisData.forEach((axisItem, axisIndex) => {
        const data = this.multiLinesChartService.parseSeriesData(axisItem.groupItems, axisIndex, chartOriginData);
        seriesData = seriesData.concat(data);
      });
      this.loadChartData(seriesData);
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
