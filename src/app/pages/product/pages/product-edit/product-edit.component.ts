import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductMockService } from '../../../../shared/services/product/product-mock.service';
import { Product } from '../../../../shared/interfaces/product/product.model';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../shared/interfaces/product/category.model';

@Component({
  selector: 'app-product-edit',
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  private router = inject(Router);
  private alertService = inject(AlertService);
  productForm: FormGroup;
  productId!: number;
  categories: Category[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductMockService
  ) {
    this.productForm = this.fb.group({
      productId: [null],
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      purchasePrice: [10, [Validators.required, Validators.min(0)]],
      sellPrice: [12, [Validators.required, Validators.min(0)]],
      unitsInStock: [1, [Validators.min(0)]],
      stockLimit: [3],
      description: [''],
      imageUrl: [''],
    });
  }
    ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin<{categories:Observable<Category[]> , product :   Observable<Product | undefined> }>({
    categories: this.productService.getCategories(),
    product: this.productService.getProductById(id)
  }).subscribe(({ categories, product })=> {
    this.categories = categories;
    if (product)
    this.productForm.patchValue({
      productId: product.productId,
      productName: product.productName,
      categoryId: product.categoryId ?? product.category?.categoryId ?? '',
      purchasePrice: product.purchasePrice,
      unitsInStock: product.unitsInStock,
      description: product.description,
      imageUrl: product.imageUrl
    });
  });
  }

  onSubmit() {
    const formValue = this.productForm.value;
    if (this.productForm.valid) {
      const selectedCategory =  this.categories.find(c => c.categoryId === Number(formValue.categoryId)) || undefined
      const updatedProduct:Product = {
        ...formValue,
        category : selectedCategory
      }
      this.productService.updateProduct(updatedProduct).pipe(
        tap((res)=>this.alertService.success(`Produit avec identifiant :${res} est modifiée`)),
        tap(()=>this.router.navigate(['/products/list']))
      ).subscribe();
    }
  }
}
