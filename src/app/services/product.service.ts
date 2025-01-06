import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/brands`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, productData);
  }

  searchProducts(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/products/search`, criteria);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategoryAndBrand(
    categoryId: string,
    brandId: string
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`, {
      params: { categoryId, brandId },
    });
  }

  getProductReviews(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}/reviews`);
  }

  saveProductReviews(productId: string, reviews: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/${productId}/reviews`, {
      reviews,
    });
  }

  getProductAssets(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/${productId}/assets`);
  }

  saveProductAssets(productId: string, formData: FormData) {
    const url = `${this.apiUrl}/products/${productId}/assets`;
    return this.http.post(url, formData);
  }

  importProducts(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/import`, formData);
  }
}
