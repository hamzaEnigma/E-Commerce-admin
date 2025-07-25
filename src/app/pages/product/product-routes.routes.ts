import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'add',
        component: ProductListComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];