import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { MatCardModule } from '@angular/material/card';
import { MockProvider } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { WeatherData } from '../../shared';
import { MatIconModule } from '@angular/material/icon';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let weatherDataManagerService: WeatherDataManagerService;
  let favoriteService: FavoriteService;

  const mockWeatherData = {
    lat: 40.7128,
    lon: -74.006,
    name: 'New York'
  } as WeatherData;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatIconModule],
      declarations: [FavoritesComponent],
      providers: [
        MockProvider(WeatherDataManagerService, {
          favoriteCitiesWeather$: of([mockWeatherData]),
          selectCity: jasmine.createSpy()
        }),
        MockProvider(FavoriteService, {
          removeFromFavorite: jasmine.createSpy()
        })
      ]
    });
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    weatherDataManagerService = TestBed.inject(WeatherDataManagerService);
    favoriteService = TestBed.inject(FavoriteService);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display favorite cities', () => {
    const cityNameElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(cityNameElement.textContent.trim()).toBe('New York');
  });

  it('should call selectCity when a favorite is clicked', () => {
    const favoriteItem = fixture.debugElement.query(By.css('.favorite-item'));
    favoriteItem.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(weatherDataManagerService.selectCity).toHaveBeenCalledWith({
      lat: mockWeatherData.lat,
      lon: mockWeatherData.lon,
      name: mockWeatherData.name!
    });
  });

  it('should call removeFromFavorite when delete button is clicked', () => {
    const removeButton = fixture.debugElement.query(By.css('button'));
    removeButton.triggerEventHandler('click', new Event('click'));

    expect(favoriteService.removeFromFavorite).toHaveBeenCalledWith({
      lat: mockWeatherData.lat,
      lon: mockWeatherData.lon,
      name: mockWeatherData.name!
    });
  });
});
