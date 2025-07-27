import { Injectable } from '@angular/core';
import { MOCK_PRODUCTS } from '../../data/products.mock';
import { Observable, of } from 'rxjs';
import { Category } from '../../interfaces/product/category.model';
import { MOCK_categories } from '../../data/categories.mock';
import { Product } from '../../interfaces/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductMockService {
  MOCK_PRODUCTS = MOCK_PRODUCTS;

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS);
  }

   getCategories(): Observable<Category[]> {
    return of(MOCK_categories);
  }
}
