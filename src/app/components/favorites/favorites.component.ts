import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { WeatherData } from '../../shared';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  public favoriteCitiesWeather$ = this.weatherDataManagerService.favoriteCitiesWeather$;

  constructor(
    private readonly weatherDataManagerService: WeatherDataManagerService,
    private readonly favoriteService: FavoriteService) {}

  public selectFavorite(data: WeatherData): void {
    const city = { lat: data.lat, lon: data.lon, name: data.name! };
    this.weatherDataManagerService.selectCity(city);
  }

  public removeFromFavorites(event: Event, data: WeatherData): void {
    event.stopPropagation();

    const city = { lat: data.lat, lon: data.lon, name: data.name! };
    this.favoriteService.removeFromFavorite(city);
  }
}
