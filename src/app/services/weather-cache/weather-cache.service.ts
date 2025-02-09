import { Injectable } from '@angular/core';
import { WeatherData } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class WeatherCacheService {
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  private readonly currentWeatherCache: Map<string, { data: WeatherData, timestamp: number }> = new Map();
  private readonly forecastCache: Map<string, { data: WeatherData[], timestamp: number }> = new Map();

  public getCacheKeys(lat: number, lon: number): { weatherKey: string; forecastKey: string } {
    return {
      weatherKey: `weather-${ lat },${ lon }`,
      forecastKey: `forecast-${ lat },${ lon }`
    };
  }

  public getCachedData(lat: number, lon: number): [WeatherData, WeatherData[]] | undefined {
    const { weatherKey, forecastKey } = this.getCacheKeys(lat, lon);
    const now = Date.now();

    const cachedCurrentWeather = this.currentWeatherCache.get(weatherKey);
    const cachedForecast = this.forecastCache.get(forecastKey);
    const isDataValid = cachedCurrentWeather && cachedForecast && now - cachedForecast.timestamp < this.CACHE_DURATION;

    if (isDataValid) {
      return [cachedCurrentWeather.data, cachedForecast.data];
    }

    return;
  }

  public setCurrentWeatherCache(lat: number, lon: number, currentWeather: WeatherData): void {
    const { weatherKey } = this.getCacheKeys(lat, lon);
    const now = Date.now();

    this.currentWeatherCache.set(weatherKey, { data: currentWeather, timestamp: now });
  }

  public setForecastCache(lat: number, lon: number, forecast: WeatherData[]): void {
    const { forecastKey } = this.getCacheKeys(lat, lon);
    const now = Date.now();

    this.forecastCache.set(forecastKey, { data: forecast, timestamp: now });
  }
}
