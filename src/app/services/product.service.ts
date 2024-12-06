import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, retry, of } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { LoggerService } from './LoggerService';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  getProducts(category: string = '', searchTerm: string = '', sortOrder: string = 'asc'): Observable<Product[]> {
    let url = this.apiUrl;

    // Append filters to the API URL
    let params = [];
    if (category && category !== 'all') params.push(`category=${category}`);
    if (searchTerm) params.push(`searchTerm=${searchTerm}`);
    if (sortOrder) params.push(`sortOrder=${sortOrder}`);

    if (params.length > 0) {
      url = `${url}?${params.join('&')}`;
    }

    this.logger.log(`Fetching products from: ${url}`);

    return this.http.get<Product[]>(url).pipe(
      retry(3),
      catchError((error) => {
        this.logger.log('Error fetching products. Returning fallback.');
        return of([]);
      }),
      map((data) => {
        this.logger.log('Fetched products');
        return data;
      })
    );
  }

  getCategories(): Observable<string[]> {
    const categoriesUrl = `${this.apiUrl}/categories`;

    this.logger.log(`Fetching categories from: ${categoriesUrl}`);

    return this.http.get<string[]>(categoriesUrl).pipe(
      retry(3),
      catchError((error) => {
        this.logger.log('Error fetching categories. Returning fallback.');
        return of([]);
      }),
      map((data) => {
        this.logger.log('Fetched categories');
        return data;
      })
    );
  }
}
