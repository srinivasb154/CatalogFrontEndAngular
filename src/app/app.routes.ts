import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategorySearchComponent } from './components/category/category-search.component';
import { SearchBrandComponent } from './components/brand/search-brand.component';
import { ProductOptionsComponent } from './components/product/product-options.component';
import { CreateProductComponent } from './components/product/create-product.component';
import { BrandDetailsComponent } from './components/brand/brand-details.component';
import { CategoryDetailsComponent } from './components/category/category-details.component';
import { ProductSearchComponent } from './components/product/search/product-search.component';
import { ProductTabComponent } from './components/product/details/product-tab.component';
import { AddProductReviewsComponent } from './components/product/reviews/add-product-reviews.component';
import { AddProductAssetsComponent } from './components/product/assets/add-product-assets.component';
import { ProductAssetsComponent } from './components/product/assets/product-assets.component';
import { ProductImportComponent } from './components/product/import/product-import.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Default route set to HomeComponent
  { path: 'products', component: ProductOptionsComponent },
  { path: 'products/create', component: CreateProductComponent },
  { path: 'products/search', component: ProductSearchComponent },
  { path: 'products/tabs/:id', component: ProductTabComponent },
  { path: 'products/add-reviews', component: AddProductReviewsComponent },
  { path: 'products/add-assets', component: AddProductAssetsComponent },
  { path: 'products/product-assets', component: ProductAssetsComponent },
  { path: 'products/product-import', component: ProductImportComponent },
  { path: 'categories', component: CategorySearchComponent },
  { path: 'categories/details/:id', component: CategoryDetailsComponent },
  { path: 'brands', component: SearchBrandComponent },
  { path: 'brands/details/:id', component: BrandDetailsComponent },
];
