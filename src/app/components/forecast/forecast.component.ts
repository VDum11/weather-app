import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeatherDataManagerService } from '../../services/weather-data-manager/weather-data-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent {
  public readonly forecast$: Observable<any>;

  constructor(private readonly weatherDataManagerService: WeatherDataManagerService) {
    this.forecast$ = this.weatherDataManagerService.forecast$;
  }
}
