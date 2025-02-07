import { TestBed } from '@angular/core/testing';

import { WeatherDataMapperService } from './weather-data-mapper.service';

describe('WeatherDataMapperService', () => {
  let service: WeatherDataMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDataMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
