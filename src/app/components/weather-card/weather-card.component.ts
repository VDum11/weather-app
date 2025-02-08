import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { filter, Observable } from 'rxjs';
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
  public isFavorite = false;
  public readonly currentWeather$: Observable<WeatherData | null>;

  constructor(
    private readonly weatherDataManagerService: WeatherDataManagerService,
    private readonly favoriteService: FavoriteService
  ) {
    this.currentWeather$ = this.weatherDataManagerService.currentWeather$;
  }

  public ngOnInit(): void {
    this.weatherDataManagerService.selectedCitySubject
      .pipe(
        filter((city) => !!city)
      )
      .subscribe((city) =>
        this.isFavorite = this.favoriteService.isFavorite(city)
      );
  }

  public toggleFavorite(): void {
    const city = this.weatherDataManagerService.selectedCitySubject.getValue()!;

    this.favoriteService.toggleFavorite(city);
    this.isFavorite = this.favoriteService.isFavorite(city);
  }
}
