import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged, EMPTY,
  filter,
  Observable,
  switchMap,
  tap
} from 'rxjs';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { CitySearchItem } from '../../shared';

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

  public readonly searchResults$: Observable<CitySearchItem[]>;

  private readonly searchResultsSubject = new BehaviorSubject<CitySearchItem[]>([]);

  constructor(private readonly weatherDataManagerService: WeatherDataManagerService) {
    this.searchResults$ = this.searchResultsSubject.asObservable();
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap(() => this.showNoResults = false),
        debounceTime(500),
        distinctUntilChanged(),
        filter((value): value is string => !!value && value.length > 2),
        tap(() => this.searchInProgress = true),
        switchMap(value => this.weatherDataManagerService.searchCity(value))
      ).subscribe((cities: CitySearchItem[]) => {
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
    this.weatherDataManagerService.selectCity(city);
    this.clearSearch();
  }
}
