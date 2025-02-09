import { WeatherData } from '../interfaces';

export const weatherDataMockFactory = (): WeatherData => ({
  date: new Date('2020-07-01T12:00:00Z'),
  humidity: 50,
  temperature: 20,
  feelsLike: 22,
  minTemperature: 18,
  maxTemperature: 23,
  cloudiness: 20,
  windSpeed: 5,
  weatherId: 800,
  weatherDescription: 'clear sky',
  weatherIcon: '01d',
  lat: 40.7128,
  lon: -74.006
});
