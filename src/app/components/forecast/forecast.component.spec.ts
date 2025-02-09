import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastComponent } from './forecast.component';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { MockProvider } from 'ng-mocks';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { WeatherData } from '../../shared';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  const mockForecastData: WeatherData[] = [{
    date: new Date(),
    humidity: 60,
    temperature: 20,
    feelsLike: 18,
    minTemperature: 15,
    maxTemperature: 25,
    cloudiness: 50,
    windSpeed: 5,
    weatherId: 800,
    weatherDescription: 'Clear sky',
    weatherIcon: '01d',
    lat: 0,
    lon: 0
  }];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [ForecastComponent],
      providers: [
        MockProvider(WeatherDataManagerService, {
          forecast$: of(mockForecastData)
        })
      ]
    });

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct high and low temperatures', () => {
    const highTempElement = fixture.debugElement.query(By.css('.temperature-section:first-child strong')).nativeElement;
    const lowTempElement = fixture.debugElement.query(By.css('.temperature-section:last-child strong')).nativeElement;

    expect(highTempElement.textContent.trim()).toBe('25°C');
    expect(lowTempElement.textContent.trim()).toBe('15°C');
  });


  it('should display the correct weather icon', () => {
    const imgElement = fixture.debugElement.query(By.css('.weather-icon')).nativeElement;
    expect(imgElement.src).toContain('01d@2x.png');
  });
});
