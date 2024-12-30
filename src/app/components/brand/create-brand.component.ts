import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class CreateBrandComponent {
  brandForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private brandService: BrandService, private router: Router) {
    this.brandForm = this.fb.group({
      brandName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      assets: [''], // This can be extended for file uploads if needed
    });
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      const brandData = this.brandForm.value;

      this.brandService.createBrand(brandData).subscribe(
        () => {
          this.successMessage = 'Brand created successfully!';
          this.errorMessage = '';
          this.brandForm.reset();
        },
        (error) => {
          console.error('Error creating brand:', error);
          this.successMessage = '';
          this.errorMessage = 'Failed to create brand. Please try again.';
        }
      );
    }
  }
}
