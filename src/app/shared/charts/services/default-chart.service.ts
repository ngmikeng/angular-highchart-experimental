import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable()
export class DefaultChartService {

  constructor() { }

  private getDefaultOption(): Highcharts.Options {
    const defaultOptions: Highcharts.Options = {
      chart: {
        style: {
          fontFamily: 'Helvetica'
        },
        zoomType: 'xy',
        spacing: [10, 15, 5, 15],
        animation: false
      },
      lang: {
        noData: 'No data to display'
      },
      title: {
        text: '',
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      xAxis: [],
      yAxis: [],
      tooltip: {
        shared: true,
        useHTML: true,
        borderColor: '#cdcdcd',
        footerFormat: '</table>',
        valueDecimals: 2
      },
      legend: {
        itemDistance: 50,
        maxHeight: 88,
        margin: 5,
        itemMarginBottom: 0
      },
      series: [],
      time: {
        useUTC: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          },
          turboThreshold: 0,
        },
        line: {
          animation: false
        }
      },
    };

    return defaultOptions;
  }

  getDefaultLineChartOption(): Highcharts.Options {
    const symbol = '●';
    const tooltipPointMaker = `<span style="color:{series.color}">${symbol}</span>`;
    const tooltipPointFormat = `
      <tr>
        <td>${tooltipPointMaker} {series.name}: </td>
        <td style="text-align: left"><b>{point.y}</b></td>
      </tr>
    `;
    const options: Highcharts.Options = this.getDefaultOption();
    options.tooltip.headerFormat = '<small><b>Time:</b> {point.key}</small><table>';
    options.tooltip.pointFormat = tooltipPointFormat;
    options.tooltip.footerFormat = '</table>';

    return options;
  }
}
