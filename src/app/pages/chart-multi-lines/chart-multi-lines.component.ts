import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { AxisConfiguration } from '../../models/axis-configuration.model';
import { AxisConfigurationService } from '../../shared/services/axis-configuration.service';

@Component({
	selector: 'app-chart-multi-lines',
	templateUrl: './chart-multi-lines.component.html',
	styleUrls: ['./chart-multi-lines.component.scss']
})
export class ChartMultiLinesComponent implements OnInit {
	listYAxisConfigs: any[] = [];
	formYAxisConfig: FormGroup;

	get axisConfigurations() {
		return this.formYAxisConfig.get('axisConfigurations') as FormArray;
	}

	constructor(
		private formBuilder: FormBuilder,
		private axisConfigurationService: AxisConfigurationService
	) { }

	ngOnInit() {
		this.listYAxisConfigs = this.axisConfigurationService.getDefaultConfigs();
		this.formYAxisConfig = this.initForm();
	}

	initForm() {
		if (this.listYAxisConfigs.length > 0) {
			return new FormGroup({
				axisConfigurations: this.axisConfigurationService.toFormArray(this.listYAxisConfigs)
			});
		} else {
			return new FormGroup({
				axisConfigurations: new FormArray([])
			});
		}
	}

	addYAxis() {
		this.listYAxisConfigs.push(null);
	}

	onDeleteAxis(dataEvent, index) {
		if (this.listYAxisConfigs.length > 0) {
			this.listYAxisConfigs.splice(index, 1);
			this.axisConfigurations.removeAt(index);
		}
	}

	submitForm(event) {
		console.log(this.formYAxisConfig.value);
	}

}
