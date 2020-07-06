import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from './cart.component';
import {CartListComponent} from './cart-list/cart-list.component';
import {CommonModule} from '@angular/common';
import {PaymentComponent} from './checkout/payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule} from '@angular/material';
import {EffectsModule} from '@ngrx/effects';
import {CartEffects} from '../../store/effects/cart.effects';
import {CreditCardEffects} from '../../store/effects/credit-card.effects';
import {CartSuccessComponent} from './cart-success/cart-success.component';

const routes: Routes = [
  {
    path: 'success',
    component: CartComponent
  },
  {
    path: '',
    component: CartComponent
  }
];

@NgModule({
  declarations: [
    CartComponent,
    CartListComponent,
    PaymentComponent,
    CartSuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    EffectsModule.forFeature([CartEffects, CreditCardEffects])
  ]
})
export class CartModule {
}
