import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class ApiChartDataService {

  constructor(
    private apiService: ApiService
  ) { }

  getMultiLineChartData() {
    // const path = `/mock/multi-line-chart-data`;
    const path = `/mock/mock-time-series`;
    return this.apiService.get(path);
  }
}
