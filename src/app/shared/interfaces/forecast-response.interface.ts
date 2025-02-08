import {
  CloudData,
  MainWeatherData,
  PrecipitationData,
  WeatherCondition,
  WindData
} from './weather-condition.interface';

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: ForecastCity;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: CloudData;
  wind: WindData;
  visibility: number;
  pop: number;
  rain?: PrecipitationData;
  snow?: PrecipitationData;
  sys: {
    pod: 'd' | 'n';
  };
  dt_txt: string;
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
