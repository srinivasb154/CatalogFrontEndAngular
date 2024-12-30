import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrandService } from '../../services/brand.service';

@Component({
  standalone: true,
  selector: 'app-search-brand',
  templateUrl: './search-brand.component.html',
  styleUrls: ['./search-brand.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SearchBrandComponent {
  brandForm: FormGroup;
  brands: any[] = [];
  displayedBrands: any[] = [];
  pageSize = 10;
  currentPage = 0;
  totalPages: number = 0;

  constructor(private fb: FormBuilder, private brandService: BrandService) {
    this.brandForm = this.fb.group({
      brandName: [''],
    });
  }

  onSearch(): void {
    const criteria = this.brandForm.value;

    this.brandService.searchBrands(criteria).subscribe((data) => {
      this.brands = data;
      this.updateDisplayedBrands();
      this.calculateTotalPages();
    });
  }

  updateDisplayedBrands(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedBrands = this.brands.slice(start, end);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.brands.length / this.pageSize);
  }

  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.updateDisplayedBrands();
  }
}
