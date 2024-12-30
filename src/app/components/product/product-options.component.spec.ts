import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductOptionsComponent } from './product-options.component';

describe('ProductOptionsComponent', () => {
  let component: ProductOptionsComponent;
  let fixture: ComponentFixture<ProductOptionsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProductOptionsComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create-product route when Create New Product link is clicked', () => {
    component.navigateTo('/create-product');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/create-product']);
  });

  it('should navigate to search-product route when Search Product link is clicked', () => {
    component.navigateTo('/search-product');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search-product']);
  });

  it('should navigate to add-product-reviews route when Add Product Reviews link is clicked', () => {
    component.navigateTo('/add-product-reviews');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/add-product-reviews']);
  });

  it('should navigate to add-product-assets route when Add Product Assets link is clicked', () => {
    component.navigateTo('/add-product-assets');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/add-product-assets']);
  });

  it('should navigate to product-assets route when Product Assets link is clicked', () => {
    component.navigateTo('/product-assets');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/product-assets']);
  });

  it('should navigate to import-products route when Import Products link is clicked', () => {
    component.navigateTo('/import-products');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/import-products']);
  });
});
