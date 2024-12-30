import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  searchCategories(criteria: { categoryName?: string; parentCategory?: string }): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: criteria });
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  saveCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoryData);
  }
}
