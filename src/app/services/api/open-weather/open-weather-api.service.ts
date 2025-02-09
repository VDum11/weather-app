import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { ApiEndpointEnum } from 'src/app/shared/enums';
import {
  CitySearchResponse,
  CurrentWeatherResponse,
  ForecastResponse,
  OpenWeatherRequestParams
} from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherApiService {
  private readonly BASE_URL = 'https://api.openweathermap.org/';
  private readonly API_KEY = environment.openWeatherKey;

  constructor(private readonly http: HttpClient) {
  }

  public searchCity(city: string): Observable<CitySearchResponse[]> {
    return this.fetchFromApi<CitySearchResponse[]>(ApiEndpointEnum.SEARCH_CITY, { q: city, limit: 5 });
  }

  public getCurrentWeather(lat: number, lon: number): Observable<CurrentWeatherResponse> {
    return this.fetchFromApi<CurrentWeatherResponse>(ApiEndpointEnum.CURRENT_WEATHER, { lat, lon, units: 'metric' });
  }

  public getForecast(lat: number, lon: number): Observable<ForecastResponse> {
    return this.fetchFromApi<ForecastResponse>(ApiEndpointEnum.FORECAST, { lat, lon, units: 'metric' });
  }

  private fetchFromApi<T>(endpoint: ApiEndpointEnum, params: OpenWeatherRequestParams): Observable<T> {
    let httpParams = new HttpParams().set('appid', this.API_KEY);
    Object.keys(params).forEach(key => httpParams = httpParams.set(key, params[key]));

    return this.http.get<T>(`${ this.BASE_URL }${ endpoint }`, { params: httpParams });
  }
}
