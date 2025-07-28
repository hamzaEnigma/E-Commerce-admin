import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BlankComponent } from './pages/blank/blank.component';
import { ProductListComponent } from './pages/product/pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
       {
        path: 'products',
        loadChildren: async () =>
          (await import('./pages/product/product-routes.routes'))
            .routes,
      },
      { path: 'categories', component: BlankComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
];
