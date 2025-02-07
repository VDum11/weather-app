import { Injectable } from '@angular/core';
import { OpenWeatherApiService } from '../open-weather-api/open-weather-api.service';
import { BehaviorSubject, filter, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { WeatherCacheService } from '../weather-cache/weather-cache.service';
import { WeatherDataMapperService } from '../weather-data-mapper/weather-data-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  public readonly selectedCity$: Observable<any>;
  public readonly currentWeather$: Observable<any>;
  public readonly forecast$: Observable<any>;

  private readonly selectedCitySubject = new BehaviorSubject<any | null>(null);
  private readonly currentWeatherSubject = new BehaviorSubject<any | null>(null);
  private readonly forecastSubject = new BehaviorSubject<any | null>(null);

  constructor(
    private readonly weatherApi: OpenWeatherApiService,
    private readonly cacheService: WeatherCacheService,
    private readonly mapper: WeatherDataMapperService
  ) {
    this.selectedCity$ = this.selectedCitySubject.asObservable();
    this.currentWeather$ = this.currentWeatherSubject.asObservable();
    this.forecast$ = this.forecastSubject.asObservable();

    this.listenToCityChanges();
  }

  public searchCity(city: string): Observable<any[]> {
    return this.weatherApi.searchCity(city).pipe(map(this.mapper.mapCitySearchResults));
  }

  public selectCity(city: any): void {
    this.selectedCitySubject.next(city);
  }

  public getWeatherAndForecast(lat: number, lon: number): Observable<[any, any]> {
    const [cachedWeather, cachedForecast] = this.cacheService.getCachedData(lat, lon);

    if (cachedWeather && cachedForecast) {
      this.currentWeatherSubject.next(cachedWeather);
      this.forecastSubject.next(cachedForecast);

      return of([cachedWeather, cachedForecast]);
    }

    return this.fetchWeatherAndForecast(lat, lon).pipe(
      map(([weather, forecast]) => {
        const weatherMappedData = this.mapper.mapWeatherData(weather);
        const forecastMappedData = this.mapper.mapForecastData(forecast);

        // TODO: Fix type assertion
        return [weatherMappedData, forecastMappedData] as any;
      }),
      tap(([weather, forecast]) => {
        this.cacheService.setCacheData(lat, lon, weather, forecast);

        this.currentWeatherSubject.next(weather);
        this.forecastSubject.next(forecast);
      })
    );
  }

  private fetchWeatherAndForecast(lat: number, lon: number): Observable<[any, any]> {
    return forkJoin([
      this.weatherApi.getCurrentWeather(lat, lon),
      this.weatherApi.getForecast(lat, lon)
    ]);
  }

  private listenToCityChanges(): void {
    this.selectedCity$
      .pipe(
        filter(city => !!city),
        switchMap(city => this.getWeatherAndForecast(city.lat, city.lon))
      )
      .subscribe();
  }
}
