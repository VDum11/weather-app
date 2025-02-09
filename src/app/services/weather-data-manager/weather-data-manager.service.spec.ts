import { TestBed } from '@angular/core/testing';
import { WeatherDataManagerService } from './weather-data-manager.service';
import { OpenWeatherApiService } from '../api/open-weather/open-weather-api.service';
import { WeatherCacheService } from '../weather-cache/weather-cache.service';
import { WeatherDataMapperService } from '../weather-data-mapper/weather-data-mapper.service';
import { FavoriteService } from '../favorite/favorite.service';
import { of, BehaviorSubject } from 'rxjs';
import {
  CityBasicInfo, cityBasicInfoMockFactory,
  CitySearchItem, citySearchItemsMockFactory,
  CitySearchResponse, citySearchResponseMockFactory,
  CurrentWeatherResponse, currentWeatherResponseMockFactory,
  ForecastResponse, forecastResponseMockFactory,
  WeatherData, weatherDataMockFactory
} from '../../shared';
import { MockProvider } from 'ng-mocks';

describe('WeatherDataManagerService', () => {
  let service: WeatherDataManagerService;
  let weatherApiService: OpenWeatherApiService;
  let cacheService: WeatherCacheService;
  let favoriteService: FavoriteService;

  let mockCity: CityBasicInfo;
  let searchResults: CitySearchResponse[];
  let mockWeather: WeatherData;
  let mockForecast: WeatherData[];
  let mockCurrentWeatherResponse: CurrentWeatherResponse;
  let mockForecastResponse: ForecastResponse;

  beforeEach(() => {
    mockCity = cityBasicInfoMockFactory();
    searchResults = citySearchResponseMockFactory();
    mockWeather = weatherDataMockFactory();
    mockForecast = [{ ...mockWeather, date: new Date(Date.now() + 86400000) }];
    mockCurrentWeatherResponse = currentWeatherResponseMockFactory();
    mockForecastResponse = forecastResponseMockFactory();

    TestBed.configureTestingModule({
      providers: [
        WeatherDataManagerService,
        MockProvider(OpenWeatherApiService, {
          searchCity: () => of(searchResults),
          getCurrentWeather: () => of(mockCurrentWeatherResponse),
          getForecast: () => of(mockForecastResponse)
        }),
        MockProvider(WeatherCacheService, {
          getCachedData: () => undefined
        }),
        MockProvider(FavoriteService, {
          favoriteCities$: new BehaviorSubject<CityBasicInfo[]>([mockCity])
        }),
        MockProvider(WeatherDataMapperService, {
          mapCitySearchResults: () => citySearchItemsMockFactory(),
          mapCurrentWeatherData: () => mockWeather,
          mapForecastData: () => mockForecast
        })
      ]
    });

    service = TestBed.inject(WeatherDataManagerService);
    weatherApiService = TestBed.inject(OpenWeatherApiService);
    cacheService = TestBed.inject(WeatherCacheService);
    favoriteService = TestBed.inject(FavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mapped city search results', () => {
    const mockSearchResults: CitySearchItem[] = citySearchItemsMockFactory();

    service.searchCity('New York').subscribe((cities) => {
      expect(cities).toEqual(mockSearchResults);
    });
  });

  it('should update selected city subject we', () => {
    service.selectCity(mockCity);
    expect(service.selectedCitySubject.getValue()).toEqual(mockCity);
  });

  it('should update current weather and forecast subjects with API data', () => {
    const getCurrentWeatherSpy = spyOn(weatherApiService, 'getCurrentWeather').and.callThrough();
    const getForecastSpy = spyOn(weatherApiService, 'getForecast').and.callThrough();

    service.selectedCitySubject.next(mockCity);

    service.currentWeather$.subscribe((weather) => {
      expect(weather).toEqual(mockWeather);
      expect(getCurrentWeatherSpy).toHaveBeenCalled();
    });

    service.forecast$.subscribe((forecast) => {
      expect(forecast).toEqual(mockForecast);
      expect(getForecastSpy).toHaveBeenCalled();
    });
  });

  it('should update current weather and forecast subjects with cached data', () => {
    const getCurrentWeatherSpy = spyOn(weatherApiService, 'getCurrentWeather').and.callThrough();
    const getForecastSpy = spyOn(weatherApiService, 'getForecast').and.callThrough();
    spyOn(cacheService, 'getCachedData').and.returnValue([mockWeather, mockForecast]);

    service.selectedCitySubject.next(mockCity);

    service.currentWeather$.subscribe((weather) => {
      expect(weather).toEqual(mockWeather);
      expect(getCurrentWeatherSpy).not.toHaveBeenCalled();
    });

    service.forecast$.subscribe((forecast) => {
      expect(forecast).toEqual(mockForecast);
      expect(getForecastSpy).not.toHaveBeenCalled();
    });
  });

  it('should update favorite cities weather subject with cached data', () => {
    const spy = spyOn(cacheService, 'getCachedData').and.returnValue([mockWeather, mockForecast]);

    (favoriteService.favoriteCities$ as BehaviorSubject<any>).next([mockCity]);
    service.favoriteCitiesWeather$.subscribe((cities) => {
      expect(cities).toEqual([mockWeather]);
      expect(spy).toHaveBeenCalled();
    });
  });
});
