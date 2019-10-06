import { TestBed } from '@angular/core/testing';

import { AxisConfigurationService } from './axis-configuration.service';

describe('AxisConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AxisConfigurationService = TestBed.get(AxisConfigurationService);
    expect(service).toBeTruthy();
  });
});
