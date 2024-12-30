import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the product options screen when Products is clicked', () => {
    component.navigateTo('/product-options');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/product-options']);
  });

  it('should navigate to the search category screen when Categories is clicked', () => {
    component.navigateTo('/search-category');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search-category']);
  });

  it('should navigate to the search brand screen when Brands is clicked', () => {
    component.navigateTo('/search-brand');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search-brand']);
  });
});
