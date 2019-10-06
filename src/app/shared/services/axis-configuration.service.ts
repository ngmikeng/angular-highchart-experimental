import { Injectable } from '@angular/core';
import { AxisConfiguration } from '../../models/axis-configuration.model';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class AxisConfigurationService {

  constructor() { }

  getDefaultConfigs(): AxisConfiguration[] {
    const leftAxis = new AxisConfiguration({
      name: 'Y Axis 1',
      opposite: false,
      dataSets: [{
        id: 'm1'
      }]
    });
    const rightAxis = new AxisConfiguration({
      name: 'Y Axis 2',
      opposite: true,
      dataSets: [{
        id: 'm2'
      }]
    });

    return [leftAxis, rightAxis];
  }

  toFormArray(axisConfigs: AxisConfiguration[]): FormArray {
    const fa: FormArray = new FormArray([]);

    axisConfigs.forEach((config) => {
      const dataSets = new FormArray([]);
      if (config.dataSets && config.dataSets.length > 0) {
        config.dataSets.forEach(dataSet => {
          const fg = new FormGroup({
            id: new FormControl(dataSet.id)
          });
          dataSets.push(fg);
        });
      }
      const group = new FormGroup({
        name: new FormControl(config.name),
        opposite: new FormControl(!!config.opposite),
        dataSets: dataSets
      });

      fa.push(group);
    });

    return fa;
  }
}
