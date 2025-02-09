import { Injectable } from '@angular/core';
import {
  CitySearchItem,
  CitySearchResponse,
  CloudData,
  CurrentWeatherResponse,
  ForecastResponse,
  MainWeatherData,
  WeatherCondition,
  WeatherData,
  WindData
} from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataMapperService {
  public mapCitySearchResults(cities: CitySearchResponse[]): CitySearchItem[] {
    return cities.map((city: CitySearchResponse) => ({
      fullLocationName: `${ city.name }, ${ city.state ? city.state + ', ' : '' }${ city.country }`,
      name: city.name,
      lat: parseFloat(city.lat.toFixed(2)),
      lon: parseFloat(city.lon.toFixed(2)),
    }));
  }

  public mapCurrentWeatherData(weatherResponse: CurrentWeatherResponse, cityName: string): WeatherData {
    const { dt, main, weather, wind, clouds, coord } = weatherResponse;
    const weatherData = this.transformWeatherData(dt, main, weather, wind, clouds, coord);
    weatherData.name = cityName;

    return weatherData;
  }

  public mapForecastData({ list, city }: ForecastResponse): WeatherData[] {
    const fiveDayForecast = list.filter((_, index) => index % 8 === 0);

    return fiveDayForecast.map((item) => {
      const { dt, main, weather, wind, clouds } = item;

      return this.transformWeatherData(dt, main, weather, wind, clouds, city.coord);
    });
  }

  private transformWeatherData(
    dt: number,
    main: MainWeatherData,
    weather: WeatherCondition[],
    wind: WindData,
    clouds: CloudData,
    coord: { lat: number, lon: number }
  ): WeatherData {
    return {
      humidity: main.humidity,
      date: new Date(dt * 1000),
      temperature: Math.round(main.temp),
      feelsLike: Math.round(main.feels_like),
      minTemperature: Math.round(main.temp_min),
      maxTemperature: Math.round(main.temp_max),
      cloudiness: clouds.all,
      windSpeed: wind.speed,
      weatherId: weather[0].id,
      weatherDescription: weather[0].description,
      weatherIcon: weather[0].icon,
      lat: parseFloat(coord.lat.toFixed(2)),
      lon: parseFloat(coord.lon.toFixed(2)),
    };
  }
}
