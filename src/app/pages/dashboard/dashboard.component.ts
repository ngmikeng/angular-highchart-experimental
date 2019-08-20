import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiLinesChartService } from '../../shared/charts/services/multi-lines-chart.service';
import { MultiLinesChartSettingsComponent } from '../../shared/components/modals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private multiLinesChartService: MultiLinesChartService
  ) { }

  ngOnInit() {
    this.multiLinesChartService.getChartOptions();
  }

  openChartSettings() {
    const modalRef = this.modalService.open(MultiLinesChartSettingsComponent);
    modalRef.componentInstance.message = 'Chart Settings';
  }

}
