import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-multi-lines-chart-settings',
  templateUrl: './multi-lines-chart-settings.component.html',
  styleUrls: ['./multi-lines-chart-settings.component.scss']
})
export class MultiLinesChartSettingsComponent implements OnInit {
  @Input() message;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
