import { CitySearchItem } from '../interfaces';

export const citySearchItemsMockFactory = (): CitySearchItem[] => ([
  {
    fullLocationName: 'New York, NY, US',
    name: 'New York',
    lat: 40.71,
    lon: -74.01
  },
  {
    fullLocationName: 'Los Angeles, CA, US',
    name: 'Los Angeles',
    lat: 34.05,
    lon: -118.24
  }
]);
