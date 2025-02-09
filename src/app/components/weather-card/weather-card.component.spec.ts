import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCardComponent } from './weather-card.component';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { MockProvider } from 'ng-mocks';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { CityBasicInfo, WeatherData } from '../../shared';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;
  let favoriteService: FavoriteService;

  const mockWeatherData = {
    lat: 40.7128,
    lon: -74.006,
    name: 'New York',
    date: new Date(),
    humidity: 60,
    temperature: 25,
    feelsLike: 26,
    minTemperature: 15,
    maxTemperature: 30,
    cloudiness: 20,
    windSpeed: 5,
    weatherId: 800,
    weatherDescription: 'Clear sky',
    weatherIcon: '01d'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatIconModule, MatButtonModule],
      declarations: [WeatherCardComponent],
      providers: [
        MockProvider(WeatherDataManagerService, {
          currentWeather$: of(mockWeatherData),
          selectedCitySubject: new BehaviorSubject({
            lat: mockWeatherData.lat,
            lon: mockWeatherData.lon,
            name: mockWeatherData.name
          } as any)
        }),
        MockProvider(FavoriteService, {
          favoriteCities$: of([mockWeatherData]),
          isFavorite: jasmine.createSpy().and.returnValue(true),
          toggleFavorite: jasmine.createSpy()
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    favoriteService = TestBed.inject(FavoriteService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather details', () => {
    const titleElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(titleElement.textContent.trim()).toBe('New York');

    const temperatureElement = fixture.debugElement.query(By.css('.temperature')).nativeElement;
    expect(temperatureElement.textContent.trim()).toBe('25°C');

    const descriptionElement = fixture.debugElement.query(By.css('.weather-details p:last-of-type')).nativeElement;
    expect(descriptionElement.textContent.trim()).toBe('Clear sky');
  });

  it('should show correct favorite icon', () => {
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(icon.textContent.trim()).toBe('star_filled');
  });

  it('should toggle favorite when the button is clicked', () => {
    const favoriteButton = fixture.debugElement.query(By.css('button[mat-icon-button]'));
    favoriteButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(favoriteService.toggleFavorite).toHaveBeenCalledWith({
      lat: mockWeatherData.lat,
      lon: mockWeatherData.lon,
      name: mockWeatherData.name
    });
  });
});
