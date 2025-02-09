import { ForecastResponse } from '../interfaces';

export const forecastResponseMockFactory = (): ForecastResponse => ({
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1707481200,
      main: {
        temp: 25.3,
        feels_like: 27.1,
        temp_min: 22.5,
        temp_max: 28.0,
        humidity: 60,
        pressure: 0
      },
      weather: [{
        id: 800, description: 'Clear sky', icon: '01d',
        main: ''
      }],
      wind: {
        speed: 5.2,
        deg: 0
      },
      clouds: { all: 10 },
      visibility: 0,
      pop: 0,
      sys: {
        pod: 'd'
      },
      dt_txt: ''
    },
    {
      dt: 1707567600,
      main: {
        temp: 22.0,
        feels_like: 23.5,
        temp_min: 20.5,
        temp_max: 25.0,
        humidity: 55,
        pressure: 0
      },
      weather: [{
        id: 802, description: 'Scattered clouds', icon: '03d',
        main: ''
      }],
      wind: {
        speed: 3.8,
        deg: 0
      },
      clouds: { all: 40 },
      visibility: 0,
      pop: 0,
      sys: {
        pod: 'd'
      },
      dt_txt: ''
    },
    {
      dt: 1707654000,
      main: {
        temp: 20.0,
        feels_like: 21.5,
        temp_min: 18.5,
        temp_max: 22.0,
        humidity: 60,
        pressure: 0
      },
      weather: [{
        id: 803, description: 'Broken clouds', icon: '04d',
        main: ''
      }],
      wind: {
        speed: 3.2,
        deg: 0
      },
      clouds: { all: 75 },
      visibility: 0,
      pop: 0,
      sys: {
        pod: 'd'
      },
      dt_txt: ''
    },
    {
      dt: 1707740400,
      main: {
        temp: 18.0,
        feels_like: 19.5,
        temp_min: 16.5,
        temp_max: 20.0,
        humidity: 65,
        pressure: 0
      },
      weather: [{
        id: 804, description: 'Overcast clouds', icon: '04d',
        main: ''
      }],
      wind: {
        speed: 2.8,
        deg: 0
      },
      clouds: { all: 100 },
      visibility: 0,
      pop: 0,
      sys: {
        pod: 'd'
      },
      dt_txt: ''
    }
  ],
  city: {
    coord: { lat: 40.7128, lon: -74.006 },
    id: 0,
    name: '',
    country: '',
    population: 0,
    timezone: 0,
    sunrise: 0,
    sunset: 0
  }
});
