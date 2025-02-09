import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    });

    service = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should show success notification', () => {
    const message = 'Success!';
    service.showSuccessNotification(message);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, undefined, {
      duration: 2500,
      panelClass: ['success-notification']
    });
  });

  it('should show error notification', () => {
    const message = 'Error!';
    service.showErrorNotification(message);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, undefined, {
      duration: 5000,
      panelClass: ['error-notification']
    });
  });
});
