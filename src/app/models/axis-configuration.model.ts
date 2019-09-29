export interface IAxisDataSet {
  id: string;
}

export interface IAxisConfiguration {
  name?: string;
  opposite?: boolean;
  dataSets?: IAxisDataSet[];
}

export class AxisConfiguration {
  name: string;
  opposite: boolean = false;
  dataSets: IAxisDataSet[];

  constructor(options: IAxisConfiguration = {}) {
    this.name = options.name;
    this.opposite = options.opposite;
    this.dataSets = options.dataSets;
  }
}
