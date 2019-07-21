import { TestBed } from '@angular/core/testing';

import { DefaultChartService } from './default-chart.service';

describe('DefaultChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultChartService = TestBed.get(DefaultChartService);
    expect(service).toBeTruthy();
  });
});
