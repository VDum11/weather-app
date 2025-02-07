import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherApiService {
  private readonly BASE_URL = 'https://api.openweathermap.org/';
  private readonly API_KEY = environment.openWeatherKey;

  constructor(private readonly http: HttpClient) {}

  public searchCity(city: string): Observable<any[]> {
    return this.fetchFromApi<any[]>('geo/1.0/direct', { q: city, limit: 5 });
  }

  public getCurrentWeather(lat: number, lon: number): Observable<any> {
    return this.fetchFromApi<any>('data/2.5/weather', { lat, lon, units: 'metric' });
  }

  public getForecast(lat: number, lon: number): Observable<any> {
    return this.fetchFromApi<any>('data/2.5/forecast', { lat, lon, units: 'metric' });
  }

  private fetchFromApi<T>(endpoint: string, params: any) {
    let httpParams = new HttpParams().set('appid', this.API_KEY);

    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    return this.http.get<T>(`${ this.BASE_URL }${ endpoint }`, { params: httpParams });
  }
}
