import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../services/category.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {
    // Create a mock CategoryService
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', ['saveCategory']);

    await TestBed.configureTestingModule({
      imports: [CategoryComponent, ReactiveFormsModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }, // Use the mock service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const categoryForm = component.categoryForm;
    expect(categoryForm).toBeDefined();
    expect(categoryForm.value).toEqual({
      categoryName: '',
      parentCategory: '',
      description: '',
    });
  });

  it('should not call the service if the form is invalid', () => {
    component.categoryForm.setValue({
      categoryName: '',
      parentCategory: '',
      description: '',
    });

    component.onSubmit();

    expect(categoryServiceSpy.saveCategory).not.toHaveBeenCalled();
  });

  it('should call the service and display success message on valid form submission', () => {
    const mockCategory = {
      categoryName: 'Electronics',
      parentCategory: 'Products',
      description: 'A category for all electronic items.',
    };

    categoryServiceSpy.saveCategory.and.returnValue(of({ success: true }));

    component.categoryForm.setValue(mockCategory);
    component.onSubmit();

    expect(categoryServiceSpy.saveCategory).toHaveBeenCalledWith(mockCategory);
    expect(component.successMessage).toBe('Category saved successfully!');
    expect(component.errorMessage).toBe('');
    expect(component.categoryForm.pristine).toBeTrue();
  });

  it('should display error message when the service call fails', () => {
    const mockCategory = {
      categoryName: 'Electronics',
      parentCategory: 'Products',
      description: 'A category for all electronic items.',
    };

    categoryServiceSpy.saveCategory.and.returnValue(throwError({ status: 500 }));

    component.categoryForm.setValue(mockCategory);
    component.onSubmit();

    expect(categoryServiceSpy.saveCategory).toHaveBeenCalledWith(mockCategory);
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('Failed to save category. Please try again.');
  });
});
