import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CategoryDetailsComponent } from './category-details.component';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Create a mock for CategoryService
    mockCategoryService = jasmine.createSpyObj('CategoryService', ['getCategoryById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'), // Mocking route parameter
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [CategoryDetailsComponent, CommonModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch category details on init when ID is provided', () => {
    const mockCategory = {
      id: '1',
      categoryName: 'Electronics',
      parentCategory: 'Products',
      description: 'Electronics description',
    };

    mockCategoryService.getCategoryById.and.returnValue(of(mockCategory)); // Mock Observable return
    component.ngOnInit();

    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockCategoryService.getCategoryById).toHaveBeenCalledWith('1');
    expect(component.category).toEqual(mockCategory);
  });

  it('should handle API errors gracefully', () => {
    mockCategoryService.getCategoryById.and.returnValue(throwError('Error occurred'));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(mockCategoryService.getCategoryById).toHaveBeenCalledWith('1');
    expect(console.error).toHaveBeenCalledWith('Error fetching category details:', 'Error occurred');
  });

  it('should navigate back to category search when onBack is called', () => {
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/category-search']);
  });
});
