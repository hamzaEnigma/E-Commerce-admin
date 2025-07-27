import { Component, inject } from '@angular/core';
import { ProductMockService } from '../../../../shared/services/product/product-mock.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, delay, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Product } from '../../../../shared/interfaces/product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private mockProductService = inject(ProductMockService);
  searchProductFormControl: FormControl = new FormControl<string>('');
  isLoading$ = new BehaviorSubject<boolean>(false);
  filteredProducts$: Observable<Product[]> = 
  combineLatest([
    this.mockProductService.getProducts().pipe(tap((res)=>console.log('products',res))),
    this.searchProductFormControl.valueChanges.pipe(startWith(''),debounceTime(400)),
  ])
  .pipe(
    tap(()=> this.isLoading$.next(true)),
    tap((res)=> console.log('products',res)),
    switchMap(([products , search]) => 
      {
      const searchData = search === null ? '' : search;
      const productsFiltered = products.filter((item: Product) => item.productName.toLowerCase().includes(searchData.toLowerCase()))
      return of(productsFiltered)
      }),
    delay(300),
    tap(()=> this.isLoading$.next(false)),
    tap(res => console.log('filteredProducts', res)),
  );


}
