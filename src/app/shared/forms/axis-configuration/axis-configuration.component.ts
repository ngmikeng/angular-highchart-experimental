import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-axis-configuration',
  templateUrl: './axis-configuration.component.html',
  styleUrls: ['./axis-configuration.component.scss']
})
export class AxisConfigurationComponent implements OnInit {
  @Input() yAxis;
  @Input()
  set axisIndex(index: number) {
    this.formIndex = index.toString();
  }
  @Input() form: FormGroup;
  @Output() onDeleteEvent = new EventEmitter<any>();

  axisForm: FormGroup | AbstractControl;
  formIndex: string;

  listMapping: any[] = [
    { id: 'm1' },
    { id: 'm2' },
    { id: 'm3' },
    { id: 'm4' },
  ];

  constructor() { }

  get axisConfigurations() {
    return this.form.get('axisConfigurations') as FormArray;
  }

  get dataSets() {
    return this.axisForm.get('dataSets') as FormArray;
  }

  ngOnInit() {
    this.axisForm = this.axisConfigurations.get(this.formIndex);
    if (!this.axisForm) {
      this.yAxis = {
        name: '',
        opposite: false,
        dataSets: []
      };
      this.axisForm = new FormGroup({
        name: new FormControl(''),
        opposite: new FormControl(false),
        dataSets: new FormArray([])
      });

      this.axisConfigurations.push(this.axisForm);
    }
  }

  addAxisDataSet() {
		if (this.yAxis) {
      const opt = { id: 'm1' };
      this.yAxis.dataSets.push(opt);
      this.dataSets.push(new FormGroup({
        id: new FormControl(opt.id)
      }));
		}
  }

  deleteAxis() {
    this.onDeleteEvent.emit();
  }

  deleteDataSet(dataSets, index) {
    if (dataSets && dataSets.length > 0) {
      dataSets.splice(index, 1);
      this.dataSets.removeAt(index);
    }
  }

}
