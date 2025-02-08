import { Injectable } from '@angular/core';
import { OpenWeatherApiService } from '../api/open-weather/open-weather-api.service';
import { BehaviorSubject, EMPTY, filter, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { WeatherCacheService } from '../weather-cache/weather-cache.service';
import { WeatherDataMapperService } from '../weather-data-mapper/weather-data-mapper.service';
import { CitySearchItem, CurrentWeatherResponse, ForecastResponse, WeatherData } from '../../shared';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataManagerService {
  public readonly currentWeather$: Observable<WeatherData | null>;
  public readonly forecast$: Observable<WeatherData[] | null>;
  public readonly favoriteCitiesWeather$: Observable<WeatherData[] | null>;

  public readonly selectedCitySubject = new BehaviorSubject<CitySearchItem | null>(null);

  private readonly currentWeatherSubject = new BehaviorSubject<WeatherData | null>(null);
  private readonly forecastSubject = new BehaviorSubject<WeatherData[]>([]);
  private readonly favoriteCitiesWeatherSubject = new BehaviorSubject<WeatherData[] | null>(null);

  constructor(
    private readonly weatherApi: OpenWeatherApiService,
    private readonly cacheService: WeatherCacheService,
    private readonly favoriteService: FavoriteService,
    private readonly mapper: WeatherDataMapperService
  ) {
    this.currentWeather$ = this.currentWeatherSubject.asObservable();
    this.forecast$ = this.forecastSubject.asObservable();
    this.favoriteCitiesWeather$ = this.favoriteCitiesWeatherSubject.asObservable();

    this.listenToCityChanges();
    this.listenToFavoriteChanges();
  }

  public searchCity(city: string): Observable<CitySearchItem[]> {
    return this.weatherApi.searchCity(city).pipe(map(this.mapper.mapCitySearchResults));
  }

  public selectCity(city: any): void {
    this.selectedCitySubject.next(city);
  }

  public listenToCityChanges(): void {
    this.selectedCitySubject
      .pipe(
        filter(city => !!city),
        switchMap(({ lat, lon, name }) => this.getWeatherAndForecast(lat, lon, name)),
        tap(([weather, forecast]) => {
          this.currentWeatherSubject.next(weather);
          this.forecastSubject.next(forecast);
        })
      ).subscribe();
  }

  private listenToFavoriteChanges(): void {
    this.favoriteService.favoriteCities$.pipe(
      switchMap((favoriteCities) => {
        const requests = favoriteCities.map(city => this.getWeatherAndForecast(city.lat, city.lon, city.name));

        return requests.length ? forkJoin(requests) : EMPTY;
      }),
      map((weatherData) => weatherData.map(([weather]) => weather)),
      tap((weatherData) => this.favoriteCitiesWeatherSubject.next(weatherData))
    ).subscribe();


    // const favoriteCities = this.favoriteService.getFavoriteCities();
    // const requests = favoriteCities.map(city =>
    //   this.weatherApi.getCurrentWeather(city.lat, city.lon)
    //     .pipe(
    //       map((weather) => this.mapper.mapCurrentWeatherData(weather, city.name)),
    //       tap((weather) => this.cacheService.setCurrentWeatherCache(city.lat, city.lon, weather))
    //     )
    // );
    //
    // forkJoin(requests)
    //   .pipe(
    //     tap((weatherData) => this.favoriteCitiesWeatherSubject.next(weatherData))
    //   )
    //   .subscribe();
  }

  private getWeatherAndForecast(lat: number, lon: number, cityName: string): Observable<[WeatherData, WeatherData[]]> {
    const cachedData = this.cacheService.getCachedData(lat, lon);

    if (cachedData) {
      const [cachedWeather, cachedForecast] = cachedData;

      return of([cachedWeather, cachedForecast]);
    }

    return this.fetchWeatherAndForecast(lat, lon).pipe(
      map(([weather, forecast]): [WeatherData, WeatherData[]] => {
        const weatherMappedData = this.mapper.mapCurrentWeatherData(weather, cityName);
        const forecastMappedData = this.mapper.mapForecastData(forecast);

        return [weatherMappedData, forecastMappedData];
      }),
      tap(([weather, forecast]) => {
        this.cacheService.setCurrentWeatherCache(lat, lon, weather);
        this.cacheService.setForecastCache(lat, lon, forecast);
      })
    );
  }

  private fetchWeatherAndForecast(lat: number, lon: number): Observable<[CurrentWeatherResponse, ForecastResponse]> {
    return forkJoin([
      this.weatherApi.getCurrentWeather(lat, lon),
      this.weatherApi.getForecast(lat, lon)
    ]);
  }
}
