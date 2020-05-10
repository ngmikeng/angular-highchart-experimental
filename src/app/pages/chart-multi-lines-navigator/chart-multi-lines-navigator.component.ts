import { Component, OnInit } from '@angular/core';
import { AxisConfiguration } from '../../models/axis-configuration.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiLinesChartService } from '../../shared/charts/services/multi-lines-chart.service';
import { AxisConfigurationService } from '../../shared/services/axis-configuration.service';
import { MultiLinesChartSettingsComponent } from '../../shared/components/modals';
import { ApiChartDataService, IChartDataResponse } from '../../shared/services/api-chart-data.service';

@Component({
  selector: 'app-chart-multi-lines-navigator',
  templateUrl: './chart-multi-lines-navigator.component.html',
  styleUrls: ['./chart-multi-lines-navigator.component.scss']
})
export class ChartMultiLinesNavigatorComponent implements OnInit {

  yAxisConfigs: AxisConfiguration[] = [];
  chartInputStates: {
    yAxisConfig: AxisConfiguration[],
    chartOriginData: IChartDataResponse
  };

  constructor(
    private modalService: NgbModal,
    private multiLinesChartService: MultiLinesChartService,
    private axisConfigurationService: AxisConfigurationService,
    private apiChartDataService: ApiChartDataService
  ) { }

  ngOnInit() {
    this.multiLinesChartService.getChartOptions();
    this.yAxisConfigs = this.axisConfigurationService.getDefaultConfigs();

    this.apiChartDataService.getMultiLineChartData().subscribe(chartOriginData => {
      this.setChartInputStates(this.yAxisConfigs, chartOriginData);
    });
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

}
