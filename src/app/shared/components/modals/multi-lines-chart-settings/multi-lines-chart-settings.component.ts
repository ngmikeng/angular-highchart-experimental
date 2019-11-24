import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { AxisConfiguration } from '../../../../models/axis-configuration.model';
import { AxisConfigurationService } from '../../../../shared/services/axis-configuration.service';

@Component({
  selector: 'app-multi-lines-chart-settings',
  templateUrl: './multi-lines-chart-settings.component.html',
  styleUrls: ['./multi-lines-chart-settings.component.scss']
})
export class MultiLinesChartSettingsComponent implements OnInit {
  @Input() message;
  @Input() yAxisConfigs: AxisConfiguration[];

  listYAxisConfigs: AxisConfiguration[];
	formYAxisConfig: FormGroup;

	get axisConfigurations() {
		return this.formYAxisConfig.get('axisConfigurations') as FormArray;
	}

	constructor(
		private activeModal: NgbActiveModal,
		private axisConfigurationService: AxisConfigurationService
	) { }

	ngOnInit() {
		this.listYAxisConfigs = this.yAxisConfigs || [];
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
    this.activeModal.close(this.formYAxisConfig.value)
  }

  closeModal() {
    this.activeModal.dismiss('closed');
  }

}
