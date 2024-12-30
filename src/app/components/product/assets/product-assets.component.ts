import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-assets',
  templateUrl: './product-assets.component.html',
  styleUrls: ['./product-assets.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class ProductAssetsComponent implements OnInit {
  assetsForm: FormGroup;
  categories: any[] = [];
  brands: any[] = [];
  products: any[] = [];
  assets: any[] = [];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.assetsForm = this.fb.group({
      categoryId: [''],
      brandId: [''],
      productId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => (this.categories = data),
      (error) => {
        console.error('Error fetching categories:', error);
        this.errorMessage = 'Error loading categories.';
      }
    );
  }

  loadBrands(): void {
    this.productService.getBrands().subscribe(
      (data) => (this.brands = data),
      (error) => {
        console.error('Error fetching brands:', error);
        this.errorMessage = 'Error loading brands.';
      }
    );
  }

  fetchProducts(): void {
    const { categoryId, brandId } = this.assetsForm.value;
    this.productService
      .getProductsByCategoryAndBrand(categoryId, brandId)
      .subscribe(
        (data) => (this.products = data),
        (error) => {
          console.error('Error fetching products:', error);
          this.errorMessage = 'Error loading products.';
        }
      );
  }

  fetchAssets(): void {
    const { productId } = this.assetsForm.value;
    if (!productId) {
      alert('Please select a product to fetch assets.');
      return;
    }

    this.productService.getProductAssets(productId).subscribe(
      (data) => (this.assets = data),
      (error) => {
        console.error('Error fetching assets:', error);
        this.errorMessage = 'Error loading assets.';
      }
    );
  }

  getImageSrc(asset: any): string {
    if (asset.type === 'Image' && asset.binaryData) {
      const base64String = btoa(
        new Uint8Array(asset.binaryData.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      return `data:image/${asset.extension};base64,${base64String}`;
    }
    return '';
  }
}
