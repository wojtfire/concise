import {CartState, initialCartState} from './cart.model';
import {CreditCardState, initialCreditCardState} from './credit-card.model';

export interface AppState {
  cart: CartState;
  cards: CreditCardState;
}

export const initialAppState = {
  cart: initialCartState,
  cards: initialCreditCardState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
