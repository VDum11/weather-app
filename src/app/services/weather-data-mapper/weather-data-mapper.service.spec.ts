import { TestBed } from '@angular/core/testing';
import { WeatherDataMapperService } from './weather-data-mapper.service';
import {
  CitySearchItem,
  citySearchItemsMockFactory,
  CitySearchResponse, citySearchResponseMockFactory,
  CurrentWeatherResponse, currentWeatherResponseMockFactory,
  ForecastResponse, forecastResponseMockFactory,
  WeatherData
} from '../../shared';

describe('WeatherDataMapperService', () => {
  let service: WeatherDataMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherDataMapperService]
    });

    service = TestBed.inject(WeatherDataMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapCitySearchResults', () => {
    it('should map city search results correctly', () => {
      const mockCityResponse: CitySearchResponse[] = citySearchResponseMockFactory();
      const expectedResults: CitySearchItem[] = citySearchItemsMockFactory();

      const result = service.mapCitySearchResults(mockCityResponse);

      expect(result.length).toBe(2);
      expect(result[0]).toEqual(expectedResults[0]);
      expect(result[1]).toEqual(expectedResults[1]);
    });
  });

  describe('mapCurrentWeatherData', () => {
    it('should correctly map current weather data', () => {
      const mockWeatherResponse: CurrentWeatherResponse = currentWeatherResponseMockFactory();

      const result = service.mapCurrentWeatherData(mockWeatherResponse, 'New York');

      expect(result).toEqual({
        name: 'New York',
        humidity: 50,
        date: new Date(160000 * 1000),
        temperature: 25,
        feelsLike: 27,
        minTemperature: 23,
        maxTemperature: 28,
        cloudiness: 10,
        windSpeed: 5.2,
        weatherId: 800,
        weatherDescription: 'clear sky',
        weatherIcon: '01d',
        lat: 40.71,
        lon: -74.01
      });
    });
  });

  describe('mapForecastData', () => {
    it('should correctly map forecast data', () => {
      const mockForecastResponse = forecastResponseMockFactory();

      const result: WeatherData[] = service.mapForecastData(mockForecastResponse);

      expect(result.length).toBe(1); // Because of filtering (index % 8 === 0)
      expect(result[0]).toEqual({
        humidity: 60,
        date: new Date(1707481200 * 1000),
        temperature: 25,
        feelsLike: 27,
        minTemperature: 23,
        maxTemperature: 28,
        cloudiness: 10,
        windSpeed: 5.2,
        weatherId: 800,
        weatherDescription: 'Clear sky',
        weatherIcon: '01d',
        lat: 40.71,
        lon: -74.01
      });
    });
  });
});
