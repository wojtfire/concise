import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {
  CartActionsTypes,
  DeleteCartItem,
  DeleteCartItemFailure,
  DeleteCartItemSuccess,
  SetCartItemQuantity,
  SetCartItemQuantityFailure,
  SetCartItemQuantitySuccess,
} from '../actions/cart.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {PaymentService} from '../../core/services/payment.service';
import {CartService} from '../../core/services/cart.service';
import {of} from 'rxjs';
import {LoaderService} from '../../core/services/loader.service';

@Injectable()
export class CartEffects {
  @Effect()
  setCartItemQuantity$ = this.actions$.pipe(
    ofType<SetCartItemQuantity>(CartActionsTypes.SET_CART_ITEM_QUANTITY),
    mergeMap(action => {
      return this.cartService.setCartItemQuantity(action.payload.product, action.payload.quantity).pipe(
        tap(() => this.loaderService.stop()),
        map(res => new SetCartItemQuantitySuccess(res.body.newCartItem)),
        catchError(res => of(new SetCartItemQuantityFailure(res.err)))
      );
    }));

  @Effect()
  deleteCartItem$ = this.actions$.pipe(
    ofType<DeleteCartItem>(CartActionsTypes.DELETE_CART_ITEM),
    mergeMap(action => {
      return this.cartService.deleteCartItem(action.payload.cartItemId).pipe(
        map(res => {
          this.loaderService.stop();
          return new DeleteCartItemSuccess({cartItemId: res.body.cartItemId});
        }),
        catchError(res => of(new DeleteCartItemFailure(res.err)))
      );
    }));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private paymentService: PaymentService,
    private cartService: CartService,
    private loaderService: LoaderService) {
  }
}
