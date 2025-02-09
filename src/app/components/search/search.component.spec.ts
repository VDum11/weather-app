import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { MockProvider } from 'ng-mocks';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CitySearchItem } from '../../shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let weatherDataManagerService: WeatherDataManagerService;
  let cdr: ChangeDetectorRef;

  const mockCities: CitySearchItem[] = [
    { name: 'New York', lat: 40.7128, lon: -74.006, fullLocationName: 'New York, USA' },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, fullLocationName: 'Los Angeles, USA' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
      ],
      declarations: [SearchComponent],
      providers: [
        MockProvider(WeatherDataManagerService, {
          searchCity: jasmine.createSpy().and.returnValue(of(mockCities)),
          selectCity: jasmine.createSpy()
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    weatherDataManagerService = TestBed.inject(WeatherDataManagerService);
    cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger a search when input changes', fakeAsync(() => {
    component.searchControl.setValue('New');
    tick(500);
    cdr.detectChanges();

    expect(weatherDataManagerService.searchCity).toHaveBeenCalledWith('New');
  }));

  it('should display search results', fakeAsync(() => {
    component.searchControl.setValue('New');
    tick(500);
    cdr.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent.trim()).toBe('New York, USA');
    expect(listItems[1].nativeElement.textContent.trim()).toBe('Los Angeles, USA');
  }));

  it('should call selectCity when a city is clicked', fakeAsync(() => {
    component.searchControl.setValue('New');
    tick(500);
    cdr.detectChanges();

    const firstCity = fixture.debugElement.query(By.css('mat-list-item'));
    firstCity.triggerEventHandler('click', null);

    expect(weatherDataManagerService.selectCity).toHaveBeenCalledWith(mockCities[0]);
  }));

  it('should clear search input and results when clear button is clicked', fakeAsync(() => {
    component.searchControl.setValue('New York');
    tick(500);
    cdr.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('button[aria-label="Clear"]'));
    clearButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.searchControl.value).toBe('');
    expect(component.showNoResults).toBeFalse();
  }));

  it('should show no results message when search yields no cities', fakeAsync(() => {
    (weatherDataManagerService.searchCity as jasmine.Spy).and.returnValue(of([]));
    component.searchControl.setValue('Unknown City');
    tick(500);
    cdr.detectChanges();

    const noResultsMessage = fixture.debugElement.query(By.css('mat-card'));
    expect(noResultsMessage.nativeElement.textContent.trim()).toBe('No results found');
  }));
});
