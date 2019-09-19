import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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
	}

	initForm() {
		this.formYAxisConfig = this.formBuilder.group({
			
		})
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

}
