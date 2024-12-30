import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBrandComponent } from './create-brand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { of, throwError } from 'rxjs';

describe('CreateBrandComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let mockBrandService: jasmine.SpyObj<BrandService>;

  beforeEach(async () => {
    mockBrandService = jasmine.createSpyObj('BrandService', ['createBrand']);

    await TestBed.configureTestingModule({
      imports: [CreateBrandComponent, ReactiveFormsModule],
      providers: [{ provide: BrandService, useValue: mockBrandService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.brandForm.value).toEqual({
      brandName: '',
      description: '',
      assets: '',
    });
  });

  it('should call the createBrand method on valid form submission', () => {
    const mockBrand = {
      brandName: 'Brand A',
      description: 'Description A',
      assets: 'Assets A',
    };

    mockBrandService.createBrand.and.returnValue(of({ success: true }));

    component.brandForm.setValue(mockBrand);
    component.onSubmit();

    expect(mockBrandService.createBrand).toHaveBeenCalledWith(mockBrand);
    expect(component.successMessage).toBe('Brand created successfully!');
    expect(component.errorMessage).toBe('');
  });

  it('should display an error message when form submission fails', () => {
    const mockBrand = {
      brandName: 'Brand A',
      description: 'Description A',
      assets: 'Assets A',
    };

    mockBrandService.createBrand.and.returnValue(throwError('Error occurred'));

    component.brandForm.setValue(mockBrand);
    component.onSubmit();

    expect(mockBrandService.createBrand).toHaveBeenCalledWith(mockBrand);
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('Failed to create brand. Please try again.');
  });
});
