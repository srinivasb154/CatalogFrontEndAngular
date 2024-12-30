import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-add-product-reviews',
  templateUrl: './add-product-reviews.component.html',
  styleUrls: ['./add-product-reviews.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AddProductReviewsComponent implements OnInit {
  reviewForm: FormGroup;
  categories: any[] = [];
  brands: any[] = [];
  products: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  reviewsVisible = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      categoryId: [''],
      brandId: [''],
      productId: ['', Validators.required],
      reviews: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => (this.categories = data),
      (error) => console.error('Error fetching categories:', error)
    );
  }

  loadBrands(): void {
    this.productService.getBrands().subscribe(
      (data) => (this.brands = data),
      (error) => console.error('Error fetching brands:', error)
    );
  }

  fetchProducts(): void {
    const { categoryId, brandId } = this.reviewForm.value;

    this.productService
      .getProductsByCategoryAndBrand(categoryId, brandId)
      .subscribe(
        (data) => (this.products = data),
        (error) => console.error('Error fetching products:', error)
      );
  }

  onProductSelect(): void {
    this.reviewsVisible = true;
  }

  get reviews(): FormArray {
    return this.reviewForm.get('reviews') as FormArray;
  }

  addReview(): void {
    this.reviews.push(
      this.fb.group({
        user: ['', Validators.required],
        comment: ['', Validators.required],
        rating: [
          '',
          [Validators.required, Validators.min(1), Validators.max(5)],
        ],
      })
    );
  }

  removeReview(index: number): void {
    this.reviews.removeAt(index);
  }

  reviewGroup(index: number): FormGroup {
    return this.reviews.at(index) as FormGroup;
  }

  submitReviews(): void {
    if (this.reviewForm.valid) {
      const { productId, reviews } = this.reviewForm.value;

      this.productService.saveProductReviews(productId, reviews).subscribe(
        () => {
          this.successMessage = 'Review(s) are successfully saved.';
          this.errorMessage = '';
          this.reviewForm.reset();
          this.reviews.clear();
          this.reviewsVisible = false;
        },
        (error) => {
          console.error('Error saving reviews:', error);
          this.successMessage = '';
          this.errorMessage = 'Failed to save reviews. Please try again.';
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/products/options']);
  }
}
