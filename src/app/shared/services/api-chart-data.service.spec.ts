import { TestBed } from '@angular/core/testing';

import { ApiChartDataService } from './api-chart-data.service';

describe('ApiChartDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiChartDataService = TestBed.get(ApiChartDataService);
    expect(service).toBeTruthy();
  });
});
