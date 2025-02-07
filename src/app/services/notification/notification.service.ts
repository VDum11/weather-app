import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private readonly matSnackBar: MatSnackBar) {}

  public showSuccessNotification(message: string): void {
    this.matSnackBar.open(message, undefined, {
      duration: 2500,
      panelClass: ['success-notification']
    });
  }

  public showErrorNotification(message: string): void {
    this.matSnackBar.open(message, undefined, {
      duration: 5000,
      panelClass: ['error-notification']
    });
  }
}
