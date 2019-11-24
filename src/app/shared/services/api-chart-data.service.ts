import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

export interface IChartDataResponse {
  data: (string | number)[][],
  map: string[]
}

@Injectable()
export class ApiChartDataService {

  constructor(
    private apiService: ApiService
  ) { }

  getMultiLineChartData(): Observable<IChartDataResponse> {
    // const path = `/mock/multi-line-chart-data`;
    const path = `/mock/mock-time-series`;
    return this.apiService.get(path);
  }
}
