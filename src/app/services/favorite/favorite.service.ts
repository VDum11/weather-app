import { Injectable } from '@angular/core';
import { CitySearchItem } from '../../shared';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  public readonly favoriteCities$: Observable<CitySearchItem[]>;
  private readonly FAVORITE_KEY = 'favorite_cities';
  private readonly favoriteCitiesSubject = new BehaviorSubject<CitySearchItem[]>([]);

  constructor() {
    this.favoriteCities$ = this.favoriteCitiesSubject.asObservable();
    this.favoriteCitiesSubject.next(this.getFavoriteCities());
  }

  public toggleFavorite(city: CitySearchItem): void {
    if (this.isFavorite(city)) {
      this.removeFromFavorite(city);
    } else {
      this.addToFavorite(city);
    }
  }

  public addToFavorite(city: CitySearchItem): void {
    const favoriteCities = this.getFavoriteCities();
    favoriteCities.push(city);
    this.saveFavoriteCities(favoriteCities);
    this.favoriteCitiesSubject.next(favoriteCities);
  }

  public removeFromFavorite(city: CitySearchItem): void {
    const favoriteCities = this.getFavoriteCities();
    const newFavoriteCities = favoriteCities.filter((favoriteCity) =>
      favoriteCity.lat !== city.lat && favoriteCity.lon !== city.lon
    );

    this.saveFavoriteCities(newFavoriteCities);
    this.favoriteCitiesSubject.next(newFavoriteCities);
  }

  public getFavoriteCities(): CitySearchItem[] {
    const favoriteCities = localStorage.getItem(this.FAVORITE_KEY);
    return favoriteCities ? JSON.parse(favoriteCities) : [];
  }

  public isFavorite(city: CitySearchItem): boolean {
    const favoriteCities = this.favoriteCitiesSubject.getValue();
    return favoriteCities.some((favoriteCity) => favoriteCity.lat === city.lat && favoriteCity.lon === city.lon);
  }

  private saveFavoriteCities(favoriteCities: CitySearchItem[]): void {
    localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(favoriteCities));
  }
}
