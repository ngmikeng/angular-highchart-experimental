import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-axis-configuration',
  templateUrl: './axis-configuration.component.html',
  styleUrls: ['./axis-configuration.component.scss']
})
export class AxisConfigurationComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() yAxis;

  listMapping: any[] = [
    { name: 'm1' },
    { name: 'm2' },
    { name: 'm3' },
    { name: 'm4' },
  ];

  constructor() { }

  ngOnInit() {
  }

  addAxisDataSet() {
		if (this.yAxis) {
			this.yAxis.dataSet.push(1);
		}
	}

}
