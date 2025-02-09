import { CurrentWeatherResponse } from '../interfaces';

export const currentWeatherResponseMockFactory = (): CurrentWeatherResponse => ({
  coord: {
    lon: -74.006,
    lat: 40.7128
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 25,
    feels_like: 27,
    temp_min: 23,
    temp_max: 28,
    pressure: 1013,
    humidity: 50
  },
  visibility: 10000,
  wind: {
    speed: 5.2,
    deg: 180
  },
  clouds: {
    all: 10
  },
  dt: 160000,
  sys: {
    type: 1,
    id: 5141,
    country: 'US',
    sunrise: 1600000000,
    sunset: 1600000000
  },
  timezone: -14400,
  id: 5128581,
  name: 'New York',
  cod: 200
});
