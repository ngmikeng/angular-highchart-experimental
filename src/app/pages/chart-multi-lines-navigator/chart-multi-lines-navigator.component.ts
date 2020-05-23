import { Component, OnInit, ViewChild } from '@angular/core';
import { AxisConfiguration } from '../../models/axis-configuration.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiLinesChartService } from '../../shared/charts/services/multi-lines-chart.service';
import { AxisConfigurationService } from '../../shared/services/axis-configuration.service';
import { MultiLinesChartSettingsComponent } from '../../shared/components/modals';
import { ApiChartDataService, IChartDataResponse, IChartDataRequestParam } from '../../shared/services/api-chart-data.service';
import { MultiLinesNavigatorChartComponent } from '../../shared/charts/components/multi-lines-navigator-chart/multi-lines-navigator-chart.component';
import { FormControl } from '@angular/forms';
import { MultiLinesNavigatorChartService } from '../../shared/charts/services/multi-lines-navigator-chart.service';

@Component({
  selector: 'app-chart-multi-lines-navigator',
  templateUrl: './chart-multi-lines-navigator.component.html',
  styleUrls: ['./chart-multi-lines-navigator.component.scss']
})
export class ChartMultiLinesNavigatorComponent implements OnInit {
  @ViewChild(MultiLinesNavigatorChartComponent, null) highchart: MultiLinesNavigatorChartComponent;

  yAxisConfigs: AxisConfiguration[] = [];
  chartInputStates: {
    yAxisConfig: AxisConfiguration[],
    chartOriginData: IChartDataResponse
  };
  lastDaysOptions: number[] = [1, 2, 3];
  lastDay: FormControl = new FormControl(1);

  constructor(
    private modalService: NgbModal,
    private multiLinesChartService: MultiLinesChartService,
    private axisConfigurationService: AxisConfigurationService,
    private apiChartDataService: ApiChartDataService,
    private multiLinesNavigatorChartService: MultiLinesNavigatorChartService
  ) { }

  ngOnInit() {
    this.multiLinesChartService.getChartOptions();
    this.yAxisConfigs = this.axisConfigurationService.getDefaultConfigs();

    this.loadDataByDays(this.lastDay.value).subscribe(chartOriginData => {
      this.setChartInputStates(this.yAxisConfigs, chartOriginData);
    });

    // reload data by last days
    this.lastDay.valueChanges.subscribe(val => {
      this.loadDataByDays(val).subscribe(chartOriginData => {
        this.setChartInputStates(this.yAxisConfigs, chartOriginData);
      });
    })
  }

  openChartSettings() {
    const modalRef = this.modalService.open(MultiLinesChartSettingsComponent, { size: 'lg' });
    modalRef.componentInstance.message = 'Chart Settings';
    modalRef.componentInstance.yAxisConfigs = this.yAxisConfigs;

    modalRef.result
      .then(result => {
        if (result && result.axisConfigurations) {
          this.yAxisConfigs = [...result.axisConfigurations];
          this.setChartInputStates(this.yAxisConfigs);
        }
      })
      .catch(reason => console.log(reason));
  }

  setChartInputStates(axisConfigs, chartData?) {
    this.chartInputStates = {
      yAxisConfig: axisConfigs ? [...axisConfigs] : this.chartInputStates.yAxisConfig,
      chartOriginData: chartData ? {...chartData} : this.chartInputStates.chartOriginData
    };
  }

  resetChart() {
    if (this.highchart) {
      this.highchart.resetZoom();
    }
  }

  loadDataByDays(lastDay: number) {
    const endTime = new Date().getTime();
    const startTime = endTime - lastDay * 86400 * 1000;
    const options: IChartDataRequestParam = {
      from: new Date(startTime).toISOString(),
      until: new Date(endTime).toISOString(),
      interval: 60
    };
    return this.apiChartDataService.getMultiLineChartData(options);
  }

  onSelectionX(eventData) {
    if (eventData && !eventData.isReset) {
      let interval = 10;
      const isLessAnHour = (eventData.maxX - eventData.minX) < (60 * 60 * 1000);
      if (isLessAnHour) {
        interval = 1;
      }
      const options: IChartDataRequestParam = {
        from: new Date(eventData.minX).toISOString(),
        until: new Date(eventData.maxX).toISOString(),
        interval: interval
      };
      this.apiChartDataService.getMultiLineChartData(options).subscribe((chartZoomData) => {
        const parsedSeriesData = this.multiLinesNavigatorChartService.parseSeriesDataByAxisConfig(
          this.chartInputStates.yAxisConfig,
          chartZoomData
        );
        this.highchart.setChartSeriesData(parsedSeriesData, true);
      });
    } else {
      const parsedSeriesData = this.multiLinesNavigatorChartService.parseSeriesDataByAxisConfig(
        this.chartInputStates.yAxisConfig,
        this.chartInputStates.chartOriginData
      );
      this.highchart.setChartSeriesData(parsedSeriesData, true);
    }
  }

}
