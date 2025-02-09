import { CitySearchResponse } from '../interfaces';

export const citySearchResponseMockFactory = (): CitySearchResponse[] => ([
  {
    name: 'New York',
    lat: 40.7128,
    lon: -74.006,
    state: 'NY',
    country: 'US'
  },
  {
    name: 'Los Angeles',
    lat: 34.0522,
    lon: -118.2437,
    state: 'CA',
    country: 'US'
  }
]);
