import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBrandComponent } from './search-brand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SearchBrandComponent', () => {
  let component: SearchBrandComponent;
  let fixture: ComponentFixture<SearchBrandComponent>;
  let mockBrandService: jasmine.SpyObj<BrandService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockBrandService = jasmine.createSpyObj('BrandService', ['searchBrands']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SearchBrandComponent, ReactiveFormsModule],
      providers: [
        { provide: BrandService, useValue: mockBrandService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the searchBrands method and display results', () => {
    const mockBrands = [
      { id: '1', brandName: 'Brand A', description: 'Description A', assets: 'Assets A' },
    ];

    mockBrandService.searchBrands.and.returnValue(of(mockBrands));
    component.brandForm.setValue({ brandName: 'Brand A' });
    component.onSearch();

    expect(mockBrandService.searchBrands).toHaveBeenCalledWith({ brandName: 'Brand A' });
    expect(component.brands).toEqual(mockBrands);
  });

  it('should navigate to create brand screen when Create Brand button is clicked', () => {
    component.onCreateBrand();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/create-brand']);
  });

  it('should navigate to brand details screen when a brand is clicked', () => {
    component.onViewDetails('1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/brand-details', '1']);
  });
});
