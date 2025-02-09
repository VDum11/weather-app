import { TestBed } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';
import { CityBasicInfo, cityBasicInfoMockFactory } from '../../shared';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let mockLocalStorage: Record<string, string> = {};
  let mockCity: CityBasicInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteService]
    });

    service = TestBed.inject(FavoriteService);

    spyOn(localStorage, 'getItem').and.callFake((key) => mockLocalStorage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key, value) => (mockLocalStorage[key] = value));
    spyOn(localStorage, 'removeItem').and.callFake((key) => delete mockLocalStorage[key]);

    mockCity = cityBasicInfoMockFactory();
    mockLocalStorage = {};
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should add city to favorites', () => {
    service.addToFavorite(mockCity);

    const favorites = service.getFavoriteCities();
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual(mockCity);
  });

  it('should remove city from favorites', () => {
    service.addToFavorite(mockCity);
    service.removeFromFavorite(mockCity);

    const favorites = service.getFavoriteCities();
    expect(favorites.length).toBe(0);
  });

  it('should toggle city in favorites', () => {
    service.toggleFavorite(mockCity);
    expect(service.isFavorite(mockCity)).toBeTrue();

    service.toggleFavorite(mockCity);
    expect(service.isFavorite(mockCity)).toBeFalse();
  });

  it('should return true if city is in favorites', () => {
    service.addToFavorite(mockCity);
    expect(service.isFavorite(mockCity)).toBeTrue();
  });

  it('should return false if city is not in favorites', () => {
    expect(service.isFavorite(mockCity)).toBeFalse();
  });

  it('should emit changes via favoriteCities$', (done) => {
    service.favoriteCities$.subscribe((favorites) => {
      if (favorites.length === 1) {
        expect(favorites[0]).toEqual(mockCity);
        done();
      }
    });

    service.addToFavorite(mockCity);
  });
});
