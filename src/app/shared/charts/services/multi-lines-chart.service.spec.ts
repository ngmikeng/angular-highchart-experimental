import { TestBed } from '@angular/core/testing';

import { MultiLinesChartService } from './multi-lines-chart.service';

describe('MultiLinesChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiLinesChartService = TestBed.get(MultiLinesChartService);
    expect(service).toBeTruthy();
  });
});
