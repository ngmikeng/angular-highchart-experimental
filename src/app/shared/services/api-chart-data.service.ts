import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

export interface IChartDataResponse {
  data: (string | number)[][],
  map: string[]
}

export interface IChartDataRequestParam {from: string; until: string; interval?: number}

@Injectable()
export class ApiChartDataService {

  constructor(
    private apiService: ApiService
  ) { }

  getMultiLineChartData(options?: IChartDataRequestParam): Observable<IChartDataResponse> {
    const path = `/mock/mock-time-series`;
    let param = new HttpParams();
    if (options) {
      param = param.set('from', options.from);
      param = param.set('until', options.until);
      if (options.interval) {
        param = param.set('interval', options.interval.toString());
      }
    }
    return this.apiService.get(path, param);
  }
}
