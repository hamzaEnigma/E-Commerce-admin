import { Component, inject } from '@angular/core';
import { ProductMockService } from '../../../../shared/services/product/product-mock.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  delay,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from '../../../../shared/interfaces/product/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private mockProductService = inject(ProductMockService);
  private alertService = inject(AlertService);
  searchProductFormControl: FormControl = new FormControl<string>('');
  isLoading$ = new BehaviorSubject<boolean>(false);
  countCategories$ = new BehaviorSubject<number>(0);
  totalQuantity$ = new BehaviorSubject<number>(0);
  totalValue$ = new BehaviorSubject<number>(0);
  filteredProducts$: Observable<Product[]> = combineLatest([
    this.mockProductService.getProducts(),
    this.searchProductFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400)
    ),
  ]).pipe(
    tap(() => this.isLoading$.next(true)),
    tap((res) => console.log('products', res)),
    switchMap(([products, search]) => {
      const searchData = (search ?? '').toString().toLowerCase();
      const productsFiltered = products.filter((item: Product) => {
        const nameMatch = item.productName.toLowerCase().includes(searchData);
        const idMatch = item.productId.toString() === searchData;
        const categMatch = item.category?.categoryName
          ?.toLowerCase()
          .includes(searchData);
        return nameMatch || idMatch || categMatch;
      });
      this.setReactiveVariables(productsFiltered);
      return of(productsFiltered);
    }),
    delay(300),
    tap(() => this.isLoading$.next(false)),
    tap((res) => this.alertService.info(res.length + ' produits trouvé(s) !'))
  );

  setCountCategories(items: Product[]): void {
    const uniqueIds = new Set(
      items
        .map((x) => x.category?.categoryId)
        .filter((id) => id !== undefined && id !== null)
    );
    this.countCategories$.next(uniqueIds.size);
  }

  setTotalQuantity(items: Product[]): void {
    const total = items.reduce((sum, p) => sum + (p.unitsInStock ?? 0), 0);
    this.totalQuantity$.next(total);
  }

  setTotalValue(items: Product[]): void {
    const total = items.reduce((sum, p) => {
      const qty = p.unitsInStock ?? 0;
      const price = p.purchasePrice ?? 0;
      return sum + qty * price;
    }, 0);
    this.totalValue$.next(total);
  }

  setReactiveVariables(productsFiltered: Product[]) {
    this.setCountCategories(productsFiltered);
    this.setTotalQuantity(productsFiltered);
    this.setTotalValue(productsFiltered);
  }

  getStockClass(item: Product): string {
    if (item.unitsInStock == null || item.stockLimit == null)
      return 'secondary';
    return item.unitsInStock > item.stockLimit ? 'success' : 'danger';
  }
}
