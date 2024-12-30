import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxEditorModule, Editor } from 'ngx-editor'; // WYSIWYG Editor Module

@Component({
  standalone: true,
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NgxEditorModule, RouterModule],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  categories: any[] = [];
  brands: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  editor: Editor;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      sku: [''],
      shortDescription: ['', Validators.required],
      longDescription: [''],
      shippingNotes: [''],
      warrantyInfo: [''],
      visibleToFrontEnd: [false],
      featuredProduct: [false],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
    });

    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  ngOnDestroy(): void {
    this.editor.destroy(); // Cleanup the editor instance
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

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      console.log('Submitting Product Data:', productData); // Debugging log

      this.productService.createProduct(productData).subscribe(
        (response) => {
          this.successMessage = 'Product created successfully!';
          this.errorMessage = '';
          this.productForm.reset();
        },
        (error) => {
          console.error('Error creating product:', error);
          this.successMessage = '';
          this.errorMessage = 'Failed to create product. Please try again.';
        }
      );
    } else {
      console.log('Form is invalid:', this.productForm.errors); // Debugging log
    }
  }
}
