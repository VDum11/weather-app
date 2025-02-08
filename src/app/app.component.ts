import { Component, OnInit } from '@angular/core';
import { WeatherDataManagerService } from './services/weather-data-manager/weather-data-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  public showFavorites = false;

  constructor(private readonly weatherDataManagerService: WeatherDataManagerService) {}

  public toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }

  public ngOnInit(): void {
    // this.weatherDataManagerService.listenToCityChanges().subscribe();
  }
}
