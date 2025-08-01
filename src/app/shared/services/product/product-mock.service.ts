import { inject, Injectable } from '@angular/core';
import { MOCK_PRODUCTS } from '../../data/products.mock';
import { filter, map, Observable, of } from 'rxjs';
import { Category } from '../../interfaces/product/category.model';
import { MOCK_categories } from '../../data/categories.mock';
import { Product } from '../../interfaces/product/product.model';
import { MOCK_PRODUCTS_supermarché } from '../../data/products-supermarché.mock';
import { MOCK_CATEGORIES_supermarche } from '../../data/categories_supermarché.mock';

@Injectable({
  providedIn: 'root',
})
export class ProductMockService {
  MOCK_PRODUCTS = MOCK_PRODUCTS_supermarché;
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS);
  }

   getCategories(): Observable<Category[]> {
    return of(MOCK_CATEGORIES_supermarche);
  }

  create(product: Product): Observable<number> {
    product.productId = Math.max(...this.MOCK_PRODUCTS.map((x) => x.productId ?? 0)) + 1;
    this.MOCK_PRODUCTS.push(product);
    return of(product.productId);
  }

  getProductById(id:number) :Observable<Product | undefined>{
      return this.getProducts().pipe(map(items=>items.find(x=>x.productId === id)))
  }

  updateProduct(updated: Product): Observable<number> {
    const index = this.MOCK_PRODUCTS.findIndex(p => p.productId === updated.productId);
    if (index !== -1) {
      this.MOCK_PRODUCTS[index] = updated;
    }
    return of(updated.productId);
  }
}
