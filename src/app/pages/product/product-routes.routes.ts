  import { Routes } from '@angular/router';
  import { ProductListComponent } from './pages/product-list/product-list.component';
  import { ProductsComponent } from './pages/products.component';
  import { ProductAddComponent } from './pages/product-add/product-add.component';

  export const routes: Routes = [
    {
      path: '',
      component: ProductsComponent,
      children: [
        {
          path: 'list',
          component: ProductListComponent,
        },
        {
          path: 'add',
          component: ProductAddComponent,
        },
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full',
        },
      ],
    },
  ];