import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public readonly languages = [
    { code: 'en', label: 'En' },
    { code: 'uk', label: 'Uk' },
  ];

  public selectedLanguage = 'en';
  public isDarkTheme = false;

  public toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  public changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    console.log('Language changed to:', lang);
    // Implement localization logic here
  }
}
