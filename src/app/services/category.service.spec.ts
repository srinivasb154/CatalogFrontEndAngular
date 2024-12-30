import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { environment } from '../../environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(), // Mock HttpClient using provideHttpClientTesting
      ],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to save category', () => {
    const mockCategory = {
      categoryName: 'Electronics',
      parentCategory: 'Products',
      description: 'Category for electronic items.',
    };

    service.saveCategory(mockCategory).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/categories`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCategory);

    req.flush({ success: true }); // Simulate a successful response
  });

  it('should handle HTTP error', () => {
    const mockCategory = {
      categoryName: 'Electronics',
      parentCategory: 'Products',
      description: 'Category for electronic items.',
    };

    service.saveCategory(mockCategory).subscribe(
      () => fail('Should have failed with 500 error'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/categories`);
    req.flush('Error occurred', { status: 500, statusText: 'Internal Server Error' });
  });
});
