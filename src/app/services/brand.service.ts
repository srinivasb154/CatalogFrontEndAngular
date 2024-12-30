import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = `${environment.apiBaseUrl}/brands`;

  constructor(private http: HttpClient) {}

  createBrand(brandData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, brandData);
  }

  searchBrands(criteria: { brandName?: string }): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: criteria });
  }

  getBrandById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
