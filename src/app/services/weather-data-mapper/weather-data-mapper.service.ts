import { Injectable } from '@angular/core';
import { CitySearchItem, CitySearchResponse, CurrentWeatherResponse, ForecastResponse } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataMapperService {
  public mapCitySearchResults(cities: CitySearchResponse[]): CitySearchItem[] {
    return cities.map((city: CitySearchResponse) => ({
      fullLocationName: `${ city.name }, ${ city.state ? city.state + ', ' : '' }${ city.country }`,
      name: city.name,
      lat: city.lat,
      lon: city.lon
    }));
  }

  public mapWeatherData(weather: CurrentWeatherResponse): any {
    return weather;
  }

  public mapForecastData(forecast: ForecastResponse): any {
    // TODO: Implement this method
    return forecast;
  }
}
