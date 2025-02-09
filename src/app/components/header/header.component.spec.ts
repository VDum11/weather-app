import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule],
      declarations: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme and update class', () => {
    const themeToggleBtn = fixture.debugElement.query(By.css('button'));

    expect(document.body.classList.contains('dark-theme')).toBeFalse();

    themeToggleBtn.triggerEventHandler('click', null);
    cdr.detectChanges();

    expect(component.isDarkTheme).toBeTrue();
    expect(document.body.classList.contains('dark-theme')).toBeTrue();

    themeToggleBtn.triggerEventHandler('click', null);
    cdr.detectChanges();

    expect(component.isDarkTheme).toBeFalse();
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });

  it('should update theme icon based on theme state', () => {
    const themeToggleBtn = fixture.debugElement.query(By.css('button'));

    let icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(icon.textContent.trim()).toBe('light_mode');

    themeToggleBtn.triggerEventHandler('click', null);
    cdr.detectChanges();

    icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(icon.textContent.trim()).toBe('dark_mode');

    themeToggleBtn.triggerEventHandler('click', null);
    cdr.detectChanges();

    icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(icon.textContent.trim()).toBe('light_mode');
  });
});
