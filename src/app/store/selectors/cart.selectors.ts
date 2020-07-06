import {CartItem, CartState} from '../state/cart.model';

export const getCartOverallPrice = (state: CartState) =>
  state.products.reduce((sum: number, product: CartItem) => product.product.price * product.quantity, 0);
