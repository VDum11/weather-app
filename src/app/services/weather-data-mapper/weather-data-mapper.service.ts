import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataMapperService {
  public mapCitySearchResults(cities: any[]): any[] {
    return cities.map((city: any) => ({
      fullName: `${ city.name }, ${ city.state ? city.state + ', ' : '' }${ city.country }`,
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      state: city?.state || null
    }));
  }

  public mapWeatherData(weather: any): unknown {
    // TODO: Implement this method
    return weather;
  }

  public mapForecastData(forecast: any): unknown[] {
    // TODO: Implement this method
    return forecast;
  }
}
