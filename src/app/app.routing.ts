import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'cart',
    loadChildren: './modules/cart/cart.module#CartModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cart'
  }
];
