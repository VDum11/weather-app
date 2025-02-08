import {
  CloudData,
  MainWeatherData,
  PrecipitationData,
  WeatherCondition,
  WindData
} from './weather-condition.interface';

export interface CurrentWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudData;
  rain?: PrecipitationData;
  snow?: PrecipitationData;
  dt: number;
  sys: {
    type?: number;
    id?: number;
    message?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
