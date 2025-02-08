import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { WeatherData } from '../../shared';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  public favoriteCitiesWeather$ = this.weatherDataManagerService.favoriteCitiesWeather$;

  constructor(private readonly weatherDataManagerService: WeatherDataManagerService) {
  }

  public selectFavorite(city: WeatherData): void {
    console.log('Selected favorite city:', city);
  }

  public removeFromFavorites(event: Event, city: WeatherData): void {
    event.stopPropagation();
    console.log('Removed favorite city:', city);
  }

}
