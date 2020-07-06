import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {fakeObservable} from './payment.service';
import {CartItem} from '../../store/state/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  deleteCartItem(cartItemId: number): Observable<HttpResponse<any>> {
    return fakeObservable(500, {cartItemId});
  }

  setCartItemQuantity(cartItem: CartItem, quantity: number) {
    const newCartItem = JSON.parse(JSON.stringify(cartItem));
    newCartItem.quantity = quantity;
    return fakeObservable(1000, {newCartItem});
  }
}
