export interface CityBasicInfo {
  name: string;
  lat: number;
  lon: number;
}

export interface CitySearchItem extends CityBasicInfo {
  fullLocationName: string;
}


