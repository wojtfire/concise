import {Component, OnInit} from '@angular/core';
import {CartItem, CartState} from '../../store/state/cart.model';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {BaseComponent} from '../../shared/component';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements OnInit {
  isCheckout: boolean;
  isSummary: boolean;
  cart: CartState;
  subtotal: number;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    super();
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && event.url === '/cart/success') {
        if (history.state.cartState) {
          this.cart = history.state.cartState;
          this.isSummary = true;
          this.isCheckout = true;
        } else {
          this.router.navigate([''], { relativeTo: route.parent });
        }
      }
    });
  }

  ngOnInit() {
    this.store.select(state => state.cart).pipe(takeUntil(this.destroy$)).subscribe(val => {
      if (val) {
        this.cart = val;
        this.subtotal = this.getSubtotal(this.cart);
      }
    });
  }

  private getSubtotal(cart: CartState) {
    return cart.products.reduce((sum: number, product: CartItem) => sum += product.quantity * product.product.price, 0);
  }

  onCheckout() {
    this.isCheckout = true;
  }
}
