import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherCacheService {
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  private readonly cache: Map<string, { data: any, timestamp: number }> = new Map();

  public getCacheKeys(lat: number, lon: number): { weatherKey: string; forecastKey: string } {
    return {
      weatherKey: `weather-${ lat },${ lon }`,
      forecastKey: `forecast-${ lat },${ lon }`
    };
  }

  public getCachedData(lat: number, lon: number): [any | null, any | null] {
    const { weatherKey, forecastKey } = this.getCacheKeys(lat, lon);
    const now = Date.now();

    const cachedWeather = this.cache.get(weatherKey);
    const cachedForecast = this.cache.get(forecastKey);
    const isDataValid = cachedWeather && cachedForecast && now - cachedWeather.timestamp < this.CACHE_DURATION;

    if (cachedWeather && cachedForecast && isDataValid) {
      return [cachedWeather.data, cachedForecast.data];
    }

    return [null, null];
  }

  public setCacheData(lat: number, lon: number, weather: any, forecast: any): void {
    const { weatherKey, forecastKey } = this.getCacheKeys(lat, lon);
    const now = Date.now();

    this.cache.set(weatherKey, { data: weather, timestamp: now });
    this.cache.set(forecastKey, { data: forecast, timestamp: now });
  }
}
