import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, EMPTY, throwError } from 'rxjs';
import { NotificationService } from '../../notification/notification.service';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Request error', error);
      notificationService.showErrorNotification('Oops! Something went wrong! Please try again.');

      return EMPTY
    })
  );
};
