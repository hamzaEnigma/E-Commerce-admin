import { inject, Injectable } from '@angular/core';
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

  create(product: Product): Observable<number> {
    product.productId = Math.max(...this.MOCK_PRODUCTS.map((x) => x.productId ?? 0)) + 1;
    this.MOCK_PRODUCTS.push(product);
    return of(product.productId);
  }
}
