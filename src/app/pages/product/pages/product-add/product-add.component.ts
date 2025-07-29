import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductMockService } from '../../../../shared/services/product/product-mock.service';
import { Category } from '../../../../shared/interfaces/product/category.model';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-product-add',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent {
  private productService = inject(ProductMockService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productId: [null],
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      sellPrice: [0, [Validators.required, Validators.min(0)]],
      unitsInStock: [0, [Validators.min(0)]],
      stockLimit:[0],
      description: [''],
      imageUrl: [''],
    });
  }

  ngOnInit(){
   this.productService.getCategories().pipe(tap((x)=>this.categories =x )).subscribe();  
  }

  onSubmit(){
    console.log('form', this.productForm);
    if (!this.productForm.valid) return;

    this.productService.create(this.productForm.value)
    .pipe(
          tap((res)=>console.log('id',res)),
          tap(()=>this.router.navigate(["/products/list"])),
          tap((res)=>this.alertService.success(`Produit avec id :${res} est ajouté à la liste`))
        )
    .subscribe();
  }
}
