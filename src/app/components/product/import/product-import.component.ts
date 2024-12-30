import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-product-import',
  templateUrl: './product-import.component.html',
  styleUrls: ['./product-import.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class ProductImportComponent {
  importForm: FormGroup;
  file: File | null = null;
  message: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.importForm = this.fb.group({
      mode: ['Add', Validators.required],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      this.file = file;
    } else {
      this.message = 'Please select a valid CSV file.';
    }
  }

  handleImport(): void {
    if (!this.file) {
      this.message = 'Please select a file.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('mode', this.importForm.value.mode);

    this.productService.importProducts(formData).subscribe(
      (response: any) => {
        this.message = response.message || 'Products imported successfully!';
      },
      (error) => {
        console.error('Error importing products:', error);
        this.message = error.error?.message || 'An unexpected error occurred.';
      }
    );
  }
}
