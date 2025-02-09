import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { WeatherData } from '../../shared';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent implements OnInit {
  public isFavorite$: Observable<boolean> | undefined;
  public readonly currentWeather$: Observable<WeatherData | null>;

  constructor(
    private readonly weatherDataManagerService: WeatherDataManagerService,
    private readonly favoriteService: FavoriteService
  ) {
    this.currentWeather$ = this.weatherDataManagerService.currentWeather$;
  }

  public ngOnInit(): void {
    this.isFavorite$ = combineLatest([
      this.weatherDataManagerService.selectedCitySubject,
      this.favoriteService.favoriteCities$
    ])
      .pipe(
        filter(([city]) => !!city),
        map(([city]) => this.favoriteService.isFavorite(city!))
      );
  }

  public toggleFavorite(): void {
    const city = this.weatherDataManagerService.selectedCitySubject.getValue()!;

    this.favoriteService.toggleFavorite(city);
  }
}
