import { Component, OnInit, ElementRef, ViewChild, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import { MultiLinesNavigatorChartService } from '../../services/multi-lines-navigator-chart.service';
import { AxisConfiguration } from '../../../../models/axis-configuration.model';
import { IChartDataResponse } from '../../../services/api-chart-data.service';
HC_stock(Highcharts);

export interface IEventChangeRangePayload {
  min: number;
  max: number;
  isReset?: boolean;
}

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

  @Output() onSelectionX: EventEmitter<IEventChangeRangePayload> = new EventEmitter();
  @Output() onChangeNavigatorRange: EventEmitter<IEventChangeRangePayload> = new EventEmitter();

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
    const self = this;
    const chartOptions = this.multiLinesNavigatorChartService.getChartOptions();
    chartOptions.chart.events = {
      selection: function(event) {
        const result = {min: null, max: null, isReset: false};
        if (event.xAxis) {
          result.min = event.xAxis[0].min;
          result.max = event.xAxis[0].max;
        } else {
          const xAxisData = this.xAxis[0].getExtremes();
          result.min = xAxisData.dataMin;
          result.max = xAxisData.dataMax;
          result.isReset = true;
        }
        self.onSelectionX.emit(result);

        return true;
      }
    };
    const xAxisOptions = this.multiLinesNavigatorChartService.getXAxisOption([
      { min: null, max: null }
    ]);
    xAxisOptions[0].events = {
      setExtremes: function(e) {
        if (e && e.trigger === 'navigator') {
          self.onChangeNavigatorRange.emit(e);
        }
      }
    }
    const yAxisOptions = this.multiLinesNavigatorChartService.getYAxisOption(yAxisData);
    chartOptions.xAxis = xAxisOptions;
    chartOptions.yAxis = yAxisOptions;
    // set main chart series data
    let seriesData = this.multiLinesNavigatorChartService.parseSeriesDataByAxisConfig(yAxisData, this._chartOriginData);
    chartOptions.series = seriesData;
    // set navigator chart series data
    chartOptions.navigator.series = seriesData.map(item => {
      return {
        type: 'line',
        data: item.data
      };
    });

    if (this.chartContainerEle && this.chartContainerEle.nativeElement) {
      this.highcharts = Highcharts.stockChart(this.chartContainerEle.nativeElement, chartOptions);
    }
  }

  resetZoom() {
    if (this.highcharts) {
      this.highcharts.zoomOut();
    }
  }

  setChartSeriesData(parsedSeriesData, isRedraw?: boolean) {
    if (parsedSeriesData && parsedSeriesData.length > 0) {
      if (this.highcharts.series) {
        this.highcharts.series.forEach(series => {
          const seriesItem = parsedSeriesData.find(item => {
            return item.id === series.options.id;
          });
          if (seriesItem) {
            series.setData(seriesItem.data, false);
          }
        });
      }
      if (isRedraw) {
        this.highcharts.redraw();
      }
    }
  }

  addChartSeries(parsedSeriesData, isRedraw?: boolean) {
    if (parsedSeriesData && parsedSeriesData.length > 0) {
      if (this.highcharts.series) {
        parsedSeriesData.forEach(series => {
          this.highcharts.addSeries(series, false, false);
        });
      }
      if (isRedraw) {
        this.highcharts.redraw();
      }
    }
  }

}
