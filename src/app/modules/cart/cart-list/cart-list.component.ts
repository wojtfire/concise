import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CartItem, CartState} from '../../../store/state/cart.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {DeleteCartItem, SetCartItemQuantity} from '../../../store/actions/cart.actions';
import {LoaderService} from '../../../core/services/loader.service';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  @ViewChild('quantityInput') quantityInput: ElementRef;

  @Input() cart: CartState;
  @Input() isSummary: boolean;
  quantityChange: number;

  constructor(private store: Store<AppState>, private loader: LoaderService) {
  }

  onQuantityChange(cartItem: CartItem) {
    this.quantityChange = null;
    this.quantityChange = cartItem.product.id;
    setTimeout(() => {
      this.quantityInput.nativeElement.value = cartItem.quantity;
      this.quantityInput.nativeElement.focus();
    });
  }

  onChangeItemQuantity(product: CartItem, event) {
    const quantity = parseInt(event.target.value, 10);
    if (quantity) {
      this.loader.start();
      this.store.dispatch(new SetCartItemQuantity({product, quantity}));
    }
    this.quantityChange = null;
  }

  onCartListItemDelete(cartItemId: number) {
    this.loader.start();
    this.store.dispatch(new DeleteCartItem({cartItemId}));
  }
}
