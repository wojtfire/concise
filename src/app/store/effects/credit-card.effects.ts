import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {PaymentService} from '../../core/services/payment.service';
import {
  AddCreditCard,
  AddCreditCardSuccess,
  CreditCardActionsTypes, CreditCardSelect,
  PayForOrder,
  PayForOrderFailure,
  PayForOrderSuccess
} from '../actions/credit-card.action';
import {CartItem, CartState} from '../state/cart.model';
import {LoaderService} from '../../core/services/loader.service';
import {Router} from '@angular/router';

@Injectable()
export class CreditCardEffects {
  @Effect()
  payForOrder$ = this.actions$.pipe(
    ofType<PayForOrder>(CreditCardActionsTypes.PAY_FOR_ORDER),
    mergeMap(action => {
      return this.paymentService.orderPayment(action.payload.selectedCard, this.getOrderSummaryPrice(action.payload.cartState)).pipe(
        map(() => {
          this.loader.stop();
          this.router.navigateByUrl('cart/success', { state: { cartState: action.payload.cartState } });
          return new PayForOrderSuccess();
        }),
        catchError(res => of(new PayForOrderFailure(res.err)))
      );
    }));

  @Effect()
  addCreditCard$ = this.actions$.pipe(
    ofType<AddCreditCard>(CreditCardActionsTypes.ADD_CREDIT_CARD),
    mergeMap(action => {
      return this.paymentService.addCreditCard(action.payload).pipe(
        map(res => {
          this.loader.stop();
          return new AddCreditCardSuccess(res.body);
        }),
        catchError(res => of(new PayForOrderFailure(res.err)))
      );
    }));

  @Effect()
  addCreditCardSuccess$ = this.actions$.pipe(
    ofType<AddCreditCardSuccess>(CreditCardActionsTypes.ADD_CREDIT_CARD_SUCCESS),
    map(action => new CreditCardSelect(action.payload)));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private paymentService: PaymentService,
    private loader: LoaderService,
    private router: Router) {
  }


  getOrderSummaryPrice(cartState: CartState) {
    return cartState.products.reduce((sum: number, product: CartItem) => sum += product.product.price, 0);
  }
}
