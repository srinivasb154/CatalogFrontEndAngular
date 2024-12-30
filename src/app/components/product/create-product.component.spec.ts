import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getCategories',
      'getBrands',
      'createProduct',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CreateProductComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories and brands on init', () => {
    const mockCategories = [
      { id: '1', categoryName: 'Category A' },
      { id: '2', categoryName: 'Category B' },
    ];
    const mockBrands = [
      { id: '1', brandName: 'Brand A' },
      { id: '2', brandName: 'Brand B' },
    ];

    mockProductService.getCategories.and.returnValue(of(mockCategories));
    mockProductService.getBrands.and.returnValue(of(mockBrands));

    component.ngOnInit();

    expect(mockProductService.getCategories).toHaveBeenCalled();
    expect(mockProductService.getBrands).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
    expect(component.brands).toEqual(mockBrands);
  });

  it('should display an error message if categories API fails', () => {
    mockProductService.getCategories.and.returnValue(throwError('Error occurred'));

    component.ngOnInit();

    expect(mockProductService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual([]);
  });

  it('should submit valid form data', () => {
    const mockProduct = {
      productName: 'Product A',
      sku: 'SKU001',
      shortDescription: 'Short description for Product A',
      longDescription: 'Long description for Product A',
      shippingNotes: 'Ships in 3 days',
      warrantyInfo: '1 year',
      visibleToFrontEnd: true,
      featuredProduct: false,
      categoryId: '1',
      brandId: '2',
    };

    mockProductService.createProduct.and.returnValue(of({ success: true }));

    component.productForm.setValue(mockProduct);
    component.onSubmit();

    expect(mockProductService.createProduct).toHaveBeenCalledWith(mockProduct);
    expect(component.successMessage).toBe('Product created successfully!');
    expect(component.errorMessage).toBe('');
  });

  it('should display an error message if product creation fails', () => {
    const mockProduct = {
      productName: 'Product A',
      sku: 'SKU001',
      shortDescription: 'Short description for Product A',
      longDescription: 'Long description for Product A',
      shippingNotes: 'Ships in 3 days',
      warrantyInfo: '1 year',
      visibleToFrontEnd: true,
      featuredProduct: false,
      categoryId: '1',
      brandId: '2',
    };

    mockProductService.createProduct.and.returnValue(throwError('Error occurred'));

    component.productForm.setValue(mockProduct);
    component.onSubmit();

    expect(mockProductService.createProduct).toHaveBeenCalledWith(mockProduct);
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('Failed to create product. Please try again.');
  });

  it('should disable the submit button for an invalid form', () => {
    component.productForm.patchValue({
      productName: '',
      shortDescription: '',
      categoryId: '',
      brandId: '',
    });

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });
});
