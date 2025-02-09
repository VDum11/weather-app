import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { apiInterceptor } from './api.interceptor';
import { NotificationService } from '../../notification/notification.service';
import { MockProvider } from 'ng-mocks';

describe('ApiInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting(),
        MockProvider(NotificationService, {
          showErrorNotification: jasmine.createSpy()
        })
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    notificationService = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch HTTP errors and show a notification', () => {
    httpClient.get('/test-endpoint').subscribe({
      next: () => fail('Expected an error'),
      error: () => {
        expect(notificationService.showErrorNotification).toHaveBeenCalledWith(
          'Oops! Something went wrong! Please try again.'
        );
      }
    });

    const req = httpMock.expectOne('/test-endpoint');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
