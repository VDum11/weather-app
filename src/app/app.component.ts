import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent  {
  public showFavorites = false;

  public toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }
}
