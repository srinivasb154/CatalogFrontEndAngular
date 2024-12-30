import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  standalone: true,
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [CategoryService],
})
export class CategorySearchComponent {
  categoryForm: FormGroup;
  categories: any[] = [];
  displayedCategories: any[] = [];
  pageSize = 10;
  currentPage = 0;
  totalPages: number = 0;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      categoryName: [''],
      parentCategory: [''],
    });
  }

  onSearch(): void {
    const criteria = this.categoryForm.value;

    this.categoryService.searchCategories(criteria).subscribe((data) => {
      this.categories = data;
      this.updateDisplayedCategories();
      this.calculateTotalPages();
    });
  }

  updateDisplayedCategories(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedCategories = this.categories.slice(start, end);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.categories.length / this.pageSize);
  }

  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.updateDisplayedCategories();
  }
}
