import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OpenWeatherApiService } from '../../services/open-weather-api/open-weather-api.service';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  switchMap,
  tap
} from 'rxjs';
import { WeatherDataService } from '../../services/weather-data/weather-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public showNoResults = false;
  public searchInProgress = false;
  public readonly searchControl = new FormControl('');

  public readonly searchResults$: Observable<any[]>;

  private readonly searchResultsSubject = new BehaviorSubject<any[]>([]);

  constructor(private readonly weatherDataService: WeatherDataService) {
    this.searchResults$ = this.searchResultsSubject.asObservable();
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value): value is string => !!value && value.length > 2),
        switchMap(value => this.weatherDataService.searchCity(value)),
        tap(() => this.searchInProgress = true)
      ).subscribe((cities: any) => {
      if (cities.length === 0) {
        this.showNoResults = true;
      }

      this.searchResultsSubject.next(cities);
      // this.searchInProgress = false;
    });
  }

  public clearSearch(): void {
    this.searchControl.setValue('');
    this.searchResultsSubject.next([]);
    this.showNoResults = false;
    // this.searchInProgress = false;
  }

  public selectCity(city: any): void {
    this.weatherDataService.selectCity(city);
    this.clearSearch();
  }
}
