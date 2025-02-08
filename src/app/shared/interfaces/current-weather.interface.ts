export interface WeatherData {
  cityName?: string;
  date: Date;
  humidity: number;
  temperature: number;
  feelsLike: number;
  minTemperature: number;
  maxTemperature: number;
  cloudiness: number;
  windSpeed: number;
  weatherId: number;
  weatherDescription: string;
  weatherIcon: string;
}
