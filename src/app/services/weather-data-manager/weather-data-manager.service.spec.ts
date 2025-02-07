import { TestBed } from '@angular/core/testing';

import { WeatherDataManagerService } from './weather-data-manager.service';

describe('WeatherDataManagerService', () => {
  let service: WeatherDataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
