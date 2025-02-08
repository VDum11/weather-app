export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CloudData {
  all: number;
}

export interface PrecipitationData {
  '1h'?: number; // For current weather
  '3h'?: number; // For forecast
}
