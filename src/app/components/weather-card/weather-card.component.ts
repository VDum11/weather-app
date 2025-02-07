import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherDataService } from '../../services/weather-data/weather-data.service';
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

  constructor(private readonly weatherDataService: WeatherDataService) {
    this.currentWeather$ = this.weatherDataService.currentWeather$;

    this.currentWeather$.subscribe((weather) => {
      console.log('WeatherCardComponent: currentWeather$', weather);
    });
  }
}
