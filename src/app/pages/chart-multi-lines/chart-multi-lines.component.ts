import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-chart-multi-lines',
	templateUrl: './chart-multi-lines.component.html',
	styleUrls: ['./chart-multi-lines.component.scss']
})
export class ChartMultiLinesComponent implements OnInit {
	listYAxis: any[] = [];

	constructor() { }

	ngOnInit() {
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
