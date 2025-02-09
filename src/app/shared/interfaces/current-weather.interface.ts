export interface WeatherData {
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
  lat: number;
  lon: number;
  name?: string;
}
