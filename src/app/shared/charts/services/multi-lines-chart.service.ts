import { Injectable } from '@angular/core';
import { DefaultChartService } from './default-chart.service';
import * as Highcharts from 'highcharts';

@Injectable()
export class MultiLinesChartService {

  constructor(
    private defaultChartService: DefaultChartService
  ) { }

  getChartOptions() {
    const options = this.defaultChartService.getDefaultLineChartOption();
    return options;
  }

  getYAxisOption(axisItems: any[], option?: any) {
    const result = [];
    if (axisItems && axisItems.length > 0) {
      for (let index = 0; index < axisItems.length; index++) {
        const setting = axisItems[index];
        if (setting) {
          let axisName = setting.name || '';
          const axisOption: Highcharts.YAxisOptions = {
            labels: {
              style: {
                // color: item.color
              }
            },
            title: {
              text: axisName,
              useHTML: false,
              style: {
                wordWrap: 'break-word',
                width: 300,
                fontFamily: 'Helvetica',
                fontWeight: 'bold'
              }
            },
            opposite: setting.opposite || false,
            showEmpty: true,
            lineWidth: 1,
            tickWidth: 1,
            min: setting.min || null,
            max: setting.max || null,
            alignTicks: true,
            gridLineWidth: 1,
          };

          if (option) {
            if (option.autoScale) {
              axisOption.min = null;
              axisOption.max = null;
            } else if (option.manualTicks) {
              axisOption.tickPositions = this.getTickPositions(setting.min, setting.max, 5);
            }
          }

          result.push(axisOption);
        }
      }
    }
    return result;
  }

  getTickPositions(min: number, max: number, numberTicks: number) {
    const ticks = [];
    if (typeof min === 'number' && typeof max === 'number' && !isNaN(min) && !isNaN(max)) {
      let tick = min;
      let step = (max - min) / numberTicks;

      while (tick < max - step / 2) {
        ticks.push(parseFloat(tick.toFixed(4)));
        tick += step;
      }
      ticks.push(max);
    }
    return ticks;
  }

  getXAxisOption(axisItems: any[], option?: any) {
    const result = [];
    if (axisItems && axisItems.length > 0) {
      for (let index = 0; index < axisItems.length; index++) {
        const setting = axisItems[index];
        const axisOption: Highcharts.XAxisOptions = {
          type: 'datetime',
          showEmpty: true,
          gridLineWidth: 1,
          title: {
            text: 'Time'
          },
          minPadding: 0,
          startOnTick: false,
          min: setting.min || null,
          max: setting.max || null,
        };

        if (option && option.formatTime) {
          axisOption.labels = {
            // tslint:disable-next-line:object-literal-shorthand
            formatter: function () {
              const utcTimestamp = new Date(this.value).getTime();
              const timezoneOffset = new Date(this.value).getTimezoneOffset() * 60 * 1000;
              return Highcharts.dateFormat('%H:%M:%S', utcTimestamp - timezoneOffset);
            }
          };
        }

        result.push(axisOption);
      }
    }
    return result;
  }
}
