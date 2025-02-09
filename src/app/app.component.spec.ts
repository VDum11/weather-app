import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ...MockComponents(
          SearchComponent,
          HeaderComponent,
          WeatherCardComponent,
          ForecastComponent,
          FavoritesComponent
        )
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize showFavorites as false', () => {
    expect(component.showFavorites).toBeFalse();
  });

  it('should toggle showFavorites when toggleFavorites() is called', () => {
    component.toggleFavorites();

    expect(component.showFavorites).toBeTrue();

    component.toggleFavorites();

    expect(component.showFavorites).toBeFalse();
  });
});
