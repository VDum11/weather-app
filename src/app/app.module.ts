import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';
import { apiInterceptor } from './services/api/interceptor/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherCardComponent,
    ForecastComponent,
    FavoritesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    ReactiveFormsModule,
    MatList,
    MatListItem,
    MatProgressBar
  ],
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
