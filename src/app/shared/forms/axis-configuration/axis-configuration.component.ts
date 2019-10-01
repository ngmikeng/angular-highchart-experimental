import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-axis-configuration',
  templateUrl: './axis-configuration.component.html',
  styleUrls: ['./axis-configuration.component.scss']
})
export class AxisConfigurationComponent implements OnInit {
  @Input() yAxis;
  @Input() form: FormGroup;
  @Output() onDeleteEvent = new EventEmitter<any>();

  axisForm: FormGroup;

  listMapping: any[] = [
    { name: 'm1' },
    { name: 'm2' },
    { name: 'm3' },
    { name: 'm4' },
  ];

  constructor() { }

  get axisConfigurations() {
    return this.form.get('axisConfigurations') as FormArray;
  }

  get dataSet() {
    return this.axisForm.get('dataSet') as FormArray;
  }

  ngOnInit() {
    this.axisForm = new FormGroup({
      name: new FormControl(''),
      opposite: new FormControl(false),
      dataSet: new FormArray([])
    });

    this.axisConfigurations.push(this.axisForm);
  }

  addAxisDataSet() {
		if (this.yAxis) {
      this.yAxis.dataSet.push(1);
      this.dataSet.push(new FormGroup({
        dataSetName: new FormControl('m1')
      }));
		}
  }

  deleteAxis() {
    this.onDeleteEvent.emit();
  }

  deleteDataSet(dataSet, index) {
    if (dataSet && dataSet.length > 0) {
      dataSet.splice(index, 1);
      this.dataSet.removeAt(index);
    }
  }

}
