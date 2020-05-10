import { TestBed } from '@angular/core/testing';

import { MultiLinesNavigatorChartService } from './multi-lines-navigator-chart.service';

describe('MultiLinesNavigatorChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiLinesNavigatorChartService = TestBed.get(MultiLinesNavigatorChartService);
    expect(service).toBeTruthy();
  });
});
