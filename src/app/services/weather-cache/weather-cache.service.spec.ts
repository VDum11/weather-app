import { TestBed } from '@angular/core/testing';
import { WeatherCacheService } from './weather-cache.service';
import { WeatherData, weatherDataMockFactory } from '../../shared';

describe('WeatherCacheService', () => {
  let service: WeatherCacheService;
  let mockTimestamp: number;
  const lat = 40.7128;
  const lon = -74.006;

  const mockWeatherData = weatherDataMockFactory();

  const mockForecastData: WeatherData[] = [
    { ...mockWeatherData, date: new Date(), temperature: 24 },
    { ...mockWeatherData, date: new Date(), temperature: 26 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherCacheService]
    });

    service = TestBed.inject(WeatherCacheService);
    mockTimestamp = Date.now();
  });

  it('should generate correct cache keys', () => {
    const keys = service.getCacheKeys(lat, lon);
    expect(keys.weatherKey).toBe('weather-40.7128,-74.006');
    expect(keys.forecastKey).toBe('forecast-40.7128,-74.006');
  });

  it('should store and retrieve current weather data from cache', () => {
    service.setCurrentWeatherCache(lat, lon, mockWeatherData);
    service.setForecastCache(lat, lon, mockForecastData);

    (service as any).currentWeatherCache.get('weather-40.7128,-74.006')!.timestamp = mockTimestamp;
    (service as any).forecastCache.get('forecast-40.7128,-74.006')!.timestamp = mockTimestamp;

    const cachedData = service.getCachedData(lat, lon);
    expect(cachedData).toBeDefined();
    expect(cachedData![0]).toEqual(mockWeatherData);
  });

  it('should store and retrieve forecast data from cache', () => {
    service.setCurrentWeatherCache(lat, lon, mockWeatherData);
    service.setForecastCache(lat, lon, mockForecastData);

    (service as any).currentWeatherCache.get('weather-40.7128,-74.006')!.timestamp = mockTimestamp;
    (service as any).forecastCache.get('forecast-40.7128,-74.006')!.timestamp = mockTimestamp;

    const cachedData = service.getCachedData(lat, lon);
    expect(cachedData).toBeDefined();
    expect(cachedData![1]).toEqual(mockForecastData);
  });

  it('should return undefined for expired cache', () => {
    service.setCurrentWeatherCache(lat, lon, mockWeatherData);
    service.setForecastCache(lat, lon, mockForecastData);

    (service as any).forecastCache.get('forecast-40.7128,-74.006')!.timestamp -= 2 * service['CACHE_DURATION'];

    expect(service.getCachedData(lat, lon)).toBeUndefined();
  });

  it('should return undefined if current weather cache is missing', () => {
    service.setForecastCache(lat, lon, mockForecastData);
    (service as any).forecastCache.get('forecast-40.7128,-74.006')!.timestamp = mockTimestamp;
    expect(service.getCachedData(lat, lon)).toBeUndefined();
  });

  it('should return undefined if forecast cache is missing', () => {
    service.setCurrentWeatherCache(lat, lon, mockWeatherData);
    (service as any).currentWeatherCache.get('weather-40.7128,-74.006')!.timestamp = mockTimestamp;
    expect(service.getCachedData(lat, lon)).toBeUndefined();
  });

  it('should return undefined if cache is expired', () => {
    service.setCurrentWeatherCache(lat, lon, mockWeatherData);
    service.setForecastCache(lat, lon, mockForecastData);
    (service as any).currentWeatherCache.get('weather-40.7128,-74.006')!.timestamp -= 2 * service['CACHE_DURATION'];
    (service as any).forecastCache.get('forecast-40.7128,-74.006')!.timestamp -= 2 * service['CACHE_DURATION'];
    expect(service.getCachedData(lat, lon)).toBeUndefined();
  });

  it('should handle cache with different coordinates', () => {
    service.setCurrentWeatherCache(34.0522, -118.2437, mockWeatherData);
    service.setForecastCache(34.0522, -118.2437, mockForecastData);
    (service as any).currentWeatherCache.get('weather-34.0522,-118.2437')!.timestamp = mockTimestamp;
    (service as any).forecastCache.get('forecast-34.0522,-118.2437')!.timestamp = mockTimestamp;
    expect(service.getCachedData(lat, lon)).toBeUndefined();
  });
});
