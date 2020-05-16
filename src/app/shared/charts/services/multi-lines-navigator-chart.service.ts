import { Injectable } from '@angular/core';
import { MultiLinesChartService } from './multi-lines-chart.service';
import { IAxisDataSet } from '../../../models/axis-configuration.model';
import { IChartDataResponse } from '../../services/api-chart-data.service';

@Injectable()
export class MultiLinesNavigatorChartService {

  constructor(
    private multiLinesChartService: MultiLinesChartService
  ) { }

  getChartOptions() {
    let options: any = this.multiLinesChartService.getChartOptions();
    options.chart.zoomType = 'x';
    options = Object.assign(options, {
      navigator: {
        adaptToUpdatedData: false,
        enabled: true,
        handles: {
          enabled: true
        },
        series: [],
        margin: 5,
        xAxis: {
          labels: {
            style: { color: '#000' }
          }
        }
      },
      scrollbar: {
        liveRedraw: false
      },
    });

    options.rangeSelector = {
      enabled: false,
      selected: 0,
      buttons: [{
        type: 'day',
        count: 1,
        text: '1d'
      }, {
        type: 'week',
        count: 1,
        text: '1w'
      }, {
        type: 'month',
        text: '1m'
      }, {
        type: 'all',
        text: 'All'
      }],
      inputEnabled: false
    };

    return options;
  }

  getYAxisOption(axisItems: any[], option?: any) {
    const result = this.multiLinesChartService.getYAxisOption(axisItems, option);
    return result;
  }

  getTickPositions(min: number, max: number, numberTicks: number) {
    return this.multiLinesChartService.getTickPositions(min, max, numberTicks);
  }

  getXAxisOption(axisItems: any[], option?: any) {
    const result = this.multiLinesChartService.getXAxisOption(axisItems, option);

    return result;
  }

  parseSeriesData(axisDataSets: IAxisDataSet[], yAxisIndex: number, originData?: IChartDataResponse) {
    let result = this.multiLinesChartService.parseSeriesData(axisDataSets, yAxisIndex, originData);

    return result;
  }
}
