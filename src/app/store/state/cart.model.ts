import {initialProductState, Product} from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  products: CartItem[];
  whileProcessing: boolean;
  error: Error;
}

export const initialCartState: CartState = {
  products: [
    ...initialProductState.products.map(product => ({product, quantity: Math.floor((Math.random() * 4) + 1)}))
  ],
  whileProcessing: false,
  error: null
};

export const emptyCartState: CartState = {
  products: [],
  whileProcessing: false,
  error: null
};
