import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CategorySearchComponent } from './category-search.component';
import { CategoryService } from '../../services/category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CategorySearchComponent', () => {
  let component: CategorySearchComponent;
  let fixture: ComponentFixture<CategorySearchComponent>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCategoryService = jasmine.createSpyObj('CategoryService', ['searchCategories']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CategorySearchComponent, ReactiveFormsModule, CommonModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorySearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.categoryForm.value).toEqual({
      categoryName: '',
      parentCategory: '',
    });
  });

  it('should call the searchCategories method of CategoryService with the correct criteria', () => {
    const mockCategories = [
      { id: '1', categoryName: 'Electronics', parentCategory: 'Products', description: 'Electronics description' },
    ];
    mockCategoryService.searchCategories.and.returnValue(of(mockCategories));

    component.categoryForm.setValue({ categoryName: 'Electronics', parentCategory: 'Products' });
    component.onSearch();

    expect(mockCategoryService.searchCategories).toHaveBeenCalledWith({
      categoryName: 'Electronics',
      parentCategory: 'Products',
    });
    expect(component.categories).toEqual(mockCategories);
    expect(component.displayedCategories).toEqual(mockCategories.slice(0, 10));
  });

  it('should update displayedCategories on page change', () => {
    component.categories = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      categoryName: `Category ${i + 1}`,
      parentCategory: 'Products',
      description: `Description ${i + 1}`,
    }));
    component.pageSize = 10;

    component.onPageChange(1);

    expect(component.currentPage).toBe(1);
    expect(component.displayedCategories).toEqual(component.categories.slice(10, 20));
  });

  it('should navigate to category details screen when onViewDetails is called', () => {
    component.onViewDetails('1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/category-details', '1']);
  });

  it('should navigate to create category screen when onCreateCategory is called', () => {
    component.onCreateCategory();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/create-category']);
  });
});
