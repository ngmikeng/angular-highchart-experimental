import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

@Component({
	selector: 'app-chart-multi-lines',
	templateUrl: './chart-multi-lines.component.html',
	styleUrls: ['./chart-multi-lines.component.scss']
})
export class ChartMultiLinesComponent implements OnInit {
	listYAxis: any[] = [];
	formYAxisConfig: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
    this.initForm();
	}

	initForm() {
		this.formYAxisConfig = new FormGroup({
      axisConfigurations: new FormArray([])
		});
	}

	addYAxis() {
		this.listYAxis.push({
			dataSet: []
		});
	}

	addAxisDataSet(option) {
		if (option) {
			option.dataSet.push(1);
		}
  }

  onDeleteAxis(dataEvent, index) {
    if (this.listYAxis.length > 0) {
      this.listYAxis.splice(index, 1);
    }
  }

}
