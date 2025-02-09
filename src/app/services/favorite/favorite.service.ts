import { Injectable } from '@angular/core';
import { CityBasicInfo } from '../../shared';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  public readonly favoriteCities$: Observable<CityBasicInfo[]>;

  private readonly FAVORITE_KEY = 'favorite_cities';
  private readonly favoriteCitiesSubject = new BehaviorSubject<CityBasicInfo[]>([]);

  constructor() {
    this.favoriteCities$ = this.favoriteCitiesSubject.asObservable();
    this.favoriteCitiesSubject.next(this.getFavoriteCities());
  }

  public toggleFavorite(city: CityBasicInfo): void {
    this.isFavorite(city)
      ? this.removeFromFavorite(city)
      : this.addToFavorite(city);
  }

  public addToFavorite(city: CityBasicInfo): void {
    const favoriteCities = this.getFavoriteCities();
    favoriteCities.push(city);
    this.saveFavoriteCities(favoriteCities);
    this.favoriteCitiesSubject.next(favoriteCities);
  }

  public removeFromFavorite(city: CityBasicInfo): void {
    const favoriteCities = this.getFavoriteCities();
    const newFavoriteCities = favoriteCities.filter((favoriteCity) =>
      favoriteCity.lat !== city.lat && favoriteCity.lon !== city.lon
    );

    this.saveFavoriteCities(newFavoriteCities);
    this.favoriteCitiesSubject.next(newFavoriteCities);
  }

  public getFavoriteCities(): CityBasicInfo[] {
    const favoriteCities = localStorage.getItem(this.FAVORITE_KEY);

    return favoriteCities ? JSON.parse(favoriteCities) : [];
  }

  public isFavorite(city: CityBasicInfo): boolean {
    const favoriteCities = this.favoriteCitiesSubject.getValue();

    return favoriteCities.some((favoriteCity: CityBasicInfo) => favoriteCity.lat === city.lat && favoriteCity.lon === city.lon);
  }

  private saveFavoriteCities(favoriteCities: CityBasicInfo[]): void {
    localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(favoriteCities));
  }
}
