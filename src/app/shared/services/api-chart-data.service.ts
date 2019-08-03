import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class ApiChartDataService {

  constructor(
    private apiService: ApiService
  ) { }

  getMultiLineChartData() {
    const path = `/multi-line-chart-data`;
    return this.apiService.get(path);
  }
}
