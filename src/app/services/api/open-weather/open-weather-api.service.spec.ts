import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { OpenWeatherApiService } from './open-weather-api.service';
import { ApiEndpointEnum } from 'src/app/shared/enums';

import { environment } from '../../../../enviroments/enviroment';
import { provideHttpClient } from '@angular/common/http';
import {
  citySearchResponseMockFactory,
  currentWeatherResponseMockFactory,
  forecastResponseMockFactory
} from '../../../shared';

describe('OpenWeatherApiService', () => {
  environment.openWeatherKey = 'mock-api-key';

  let service: OpenWeatherApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenWeatherApiService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(OpenWeatherApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch city search results', () => {
    const mockCityResponse = citySearchResponseMockFactory();
    service.searchCity('New York').subscribe((response) => {
      expect(response).toEqual(mockCityResponse);
    });

    const req = httpMock.expectOne((req) =>
      req.url.includes(ApiEndpointEnum.SEARCH_CITY) &&
      req.params.get('appid') === environment.openWeatherKey &&
      req.params.get('q') === 'New York' &&
      req.params.get('limit') === '5'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockCityResponse);
  });

  it('should fetch current weather', () => {
    const mockResponse = currentWeatherResponseMockFactory();

    service.getCurrentWeather(40.7128, -74.006).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((req) =>
      req.url.includes(ApiEndpointEnum.CURRENT_WEATHER) &&
      req.params.get('appid') === environment.openWeatherKey &&
      req.params.get('lat') === '40.7128' &&
      req.params.get('lon') === '-74.006' &&
      req.params.get('units') === 'metric'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch forecast', () => {
    const mockForecastResponse = forecastResponseMockFactory();
    service.getForecast(40.7128, -74.006).subscribe((response) => {
      expect(response).toEqual(mockForecastResponse);
    });

    const req = httpMock.expectOne((req) =>
      req.url.includes(ApiEndpointEnum.FORECAST) &&
      req.params.get('appid') === environment.openWeatherKey &&
      req.params.get('lat') === '40.7128' &&
      req.params.get('lon') === '-74.006' &&
      req.params.get('units') === 'metric'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockForecastResponse);
  });
});
