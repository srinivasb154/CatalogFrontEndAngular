import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-add-product-assets',
  templateUrl: './add-product-assets.component.html',
  styleUrls: ['./add-product-assets.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class AddProductAssetsComponent implements OnInit {
  assetForm: FormGroup;
  categories: any[] = [];
  brands: any[] = [];
  products: any[] = [];
  selectedFiles: File[] = [];
  assets: any[] = [];
  fileData: { binaryData: ArrayBuffer; fileName: string }[] = [];
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.assetForm = this.fb.group({
      categoryId: [''],
      brandId: [''],
      productId: [''],
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
    const { categoryId, brandId } = this.assetForm.value;
    this.productService
      .getProductsByCategoryAndBrand(categoryId, brandId)
      .subscribe(
        (data) => (this.products = data),
        (error) => console.error('Error fetching products:', error)
      );
  }

  handleFileSelect(event: any): void {
    const files = Array.from(event.target.files) as File[];
    if (files.length === 0) {
      alert('No files selected!');
      return;
    }
    this.selectedFiles = files;

    // Convert files to binary data and populate fileData
    const fileDataPromises = files.map(async (file) => {
      const binaryData = await file.arrayBuffer();
      return {
        fileName: file.name,
        binaryData,
      };
    });

    Promise.all(fileDataPromises)
      .then((resolvedData) => {
        this.fileData = resolvedData;
      })
      .catch((error) => {
        console.error('Error processing file data:', error);
        this.fileData = [];
      });
  }

  handleOk(): void {
    if (this.selectedFiles.length === 0) {
      alert('No files selected!');
      return;
    }

    const newAssets = this.selectedFiles.map((file, index) => {
      const extension = file.name.includes('.')
        ? file.name.split('.').pop() ?? ''
        : 'unknown';
      let type = 'Other';

      if (file.type.includes('image')) {
        type = 'Image';
      } else if (file.type.includes('video')) {
        type = 'Video';
      } else if (
        ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)
      ) {
        type = 'Document';
      }

      return {
        productAssetId: this.assets.length + index + 1,
        fileName: file.name,
        type,
        extension,
      };
    });

    // Update assets list and clear selected files
    this.assets = [...this.assets, ...newAssets];
    this.selectedFiles = [];

    // Optionally, reset the file input element
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  saveAssets(): void {
    const { productId } = this.assetForm.value;

    if (!productId) {
      alert('Please select a product to save assets.');
      return;
    }

    if (!this.fileData || this.fileData.length === 0) {
      alert('No files to save!');
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('assets', JSON.stringify(this.assets));

    console.log(this.fileData);

    this.fileData.forEach((file) => {
      formData.append('files', new Blob([file.binaryData]), file.fileName);
    });

    // Call the service method with the dynamically constructed URL
    this.productService.saveProductAssets(productId, formData).subscribe(
      (response) => {
        alert('Assets saved successfully!');
        this.assets = []; // Clear assets after saving
        this.fileData = []; // Clear fileData after saving
      },
      (error) => {
        console.error('Error saving assets:', error);
        alert('Failed to save assets.');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/products/options']);
  }
}
