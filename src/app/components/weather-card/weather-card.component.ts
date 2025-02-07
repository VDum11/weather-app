import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent {
  public readonly currentWeather$: Observable<any>;

  constructor(private readonly weatherDataManagerService: WeatherDataManagerService) {
    this.currentWeather$ = this.weatherDataManagerService.currentWeather$;

    this.currentWeather$.subscribe((weather) => {
      console.log('WeatherCardComponent: currentWeather$', weather);
    });
  }
}
