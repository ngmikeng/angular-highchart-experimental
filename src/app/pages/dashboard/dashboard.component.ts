import { Component, OnInit } from '@angular/core';
import { MultiLinesChartService } from '../../shared/charts/services/multi-lines-chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private multiLinesChartService: MultiLinesChartService
  ) { }

  ngOnInit() {
    this.multiLinesChartService.getChartOptions();
  }

}
