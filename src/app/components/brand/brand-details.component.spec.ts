import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandDetailsComponent } from './brand-details.component';
import { BrandService } from '../../services/brand.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('BrandDetailsComponent', () => {
  let component: BrandDetailsComponent;
  let fixture: ComponentFixture<BrandDetailsComponent>;
  let mockBrandService: jasmine.SpyObj<BrandService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockBrandService = jasmine.createSpyObj('BrandService', ['getBrandById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [BrandDetailsComponent],
      providers: [
        { provide: BrandService, useValue: mockBrandService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch brand details on init', () => {
    const mockBrand = {
      id: '1',
      brandName: 'Brand A',
      description: 'Description A',
      assets: 'Assets A',
    };

    mockBrandService.getBrandById.and.returnValue(of(mockBrand));
    component.ngOnInit();

    expect(mockBrandService.getBrandById).toHaveBeenCalledWith('1');
    expect(component.brand).toEqual(mockBrand);
  });

  it('should handle API errors gracefully', () => {
    mockBrandService.getBrandById.and.returnValue(throwError('Error occurred'));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(mockBrandService.getBrandById).toHaveBeenCalledWith('1');
    expect(console.error).toHaveBeenCalledWith('Error fetching brand details:', 'Error occurred');
  });

  it('should navigate back to search brand screen when Back button is clicked', () => {
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search-brand']);
  });
});
