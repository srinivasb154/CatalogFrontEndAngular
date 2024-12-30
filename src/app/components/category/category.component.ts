import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
})
export class CategoryComponent {
  categoryForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.minLength(3)]],
      parentCategory: [''],
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      this.categoryService.saveCategory(categoryData).subscribe(
        () => {
          this.successMessage = 'Category saved successfully!';
          this.errorMessage = '';
          this.categoryForm.reset();
        },
        (error) => {
          console.error('Error saving category:', error);
          this.successMessage = '';
          this.errorMessage = 'Failed to save category. Please try again.';
        }
      );
    }
  }
}
