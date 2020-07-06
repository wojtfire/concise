import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {cartReducer} from './cart.reducer';
import {creditCardReducer} from './credit-card.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
  cards: creditCardReducer,
  cart: cartReducer
};
