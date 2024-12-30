import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, provideHttpClientTesting()],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', () => {
    const mockCategories = [
      { id: '1', categoryName: 'Category A' },
      { id: '2', categoryName: 'Category B' },
    ];

    service.getCategories().subscribe((data) => {
      expect(data).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch brands', () => {
    const mockBrands = [
      { id: '1', brandName: 'Brand A' },
      { id: '2', brandName: 'Brand B' },
    ];

    service.getBrands().subscribe((data) => {
      expect(data).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/brands`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBrands);
  });

  it('should send a POST request to create a product', () => {
    const mockProduct = {
      productName: 'Product A',
      sku: 'SKU001',
      shortDescription: 'Short description for Product A',
      longDescription: 'Long description for Product A',
      categoryId: '1',
      brandId: '2',
    };

    service.createProduct(mockProduct).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush({ success: true });
  });
});
