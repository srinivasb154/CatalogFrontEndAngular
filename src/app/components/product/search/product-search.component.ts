import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProductStateService } from '../../../services/product-state.service';

@Component({
  standalone: true,
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ProductSearchComponent implements OnInit {
  productSearchForm: FormGroup;
  categories: any[] = [];
  brands: any[] = [];
  products: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productStateService: ProductStateService,
    private router: Router
  ) {
    this.productSearchForm = this.fb.group({
      productName: [''],
      sku: [''],
      categoryId: [''],
      brandId: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  loadBrands(): void {
    this.productService.getBrands().subscribe(
      (data) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  onSearch(): void {
    const searchCriteria = this.productSearchForm.value;
    this.productService.searchProducts(searchCriteria).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.products.length / this.pageSize))
      .fill(0)
      .map((_, index) => index + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  navigateToProductTabs(product: any): void {
    const enhancedProduct = {
      ...product,
      categoryName:
        this.categories.find((c) => c._id === product.categoryId)
          ?.categoryName || 'Unknown Category',
      brandName:
        this.brands.find((b) => b._id === product.brandId)?.brandName ||
        'Unknown Brand',
    };

    // Log the enhanced product for debugging
    console.log('Navigating with product:', enhancedProduct);

    // Set the enhanced product in the shared state
    this.productStateService.setProduct(enhancedProduct);

    // Navigate to the Product Tab screen
    this.router.navigate(['/products/tabs', product._id]);
  }

  logProduct(product: any): void {
    console.log('Navigating with product:', product);
  }
}
