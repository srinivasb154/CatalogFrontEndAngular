import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandService, provideHttpClientTesting()],
    });

    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a brand', () => {
    const mockBrand = {
      brandName: 'Brand A',
      description: 'Description for Brand A',
      assets: 'Assets for Brand A',
    };

    service.createBrand(mockBrand).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/brands`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBrand);
    req.flush({ success: true });
  });

  it('should send a GET request to search brands', () => {
    const mockBrands = [
      { brandName: 'Brand A', description: 'Description A', assets: 'Assets A' },
    ];

    service.searchBrands({ brandName: 'Brand A' }).subscribe((data) => {
      expect(data).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/brands?brandName=Brand A`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBrands);
  });

  it('should send a GET request to fetch brand details by ID', () => {
    const mockBrand = {
      id: '1',
      brandName: 'Brand A',
      description: 'Description A',
      assets: 'Assets A',
    };

    service.getBrandById('1').subscribe((data) => {
      expect(data).toEqual(mockBrand);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/brands/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBrand);
  });
});
