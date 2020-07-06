import {CreditCard} from '../state/credit-card.model';
import {Action} from '@ngrx/store';
import {CartState} from '../state/cart.model';

export enum CreditCardActionsTypes {
  ADD_CREDIT_CARD = '[CreditCard] Add card',
  ADD_CREDIT_CARD_SUCCESS = '[CreditCard] Add card success',
  ADD_CREDIT_CARD_FAILURE = '[CreditCard] Add card failure',
  CREDIT_CARD_SELECT = '[CreditCard] Select',
  PAY_FOR_ORDER = '[CreditCard] Pay for order',
  PAY_FOR_ORDER_SUCCESS = '[CreditCard] Pay for order success',
  PAY_FOR_ORDER_FAILURE = '[CreditCard] Pay for order failure'
}

export class AddCreditCard implements Action {
  public readonly type = CreditCardActionsTypes.ADD_CREDIT_CARD;

  constructor(public payload: CreditCard) {
  }
}

export class AddCreditCardSuccess implements Action {
  public readonly type = CreditCardActionsTypes.ADD_CREDIT_CARD_SUCCESS;

  constructor(public payload: CreditCard) {
  }
}

export class AddCreditCardFailure implements Action {
  public readonly type = CreditCardActionsTypes.ADD_CREDIT_CARD_FAILURE;

  constructor(public payload: Error) {
  }
}

export class CreditCardSelect implements Action {
  public readonly type = CreditCardActionsTypes.CREDIT_CARD_SELECT;

  constructor(public payload: CreditCard) {
  }
}

export class PayForOrder implements Action {
  public readonly type = CreditCardActionsTypes.PAY_FOR_ORDER;

  constructor(public payload: { selectedCard: CreditCard, cartState: CartState }) {
  }
}

export class PayForOrderSuccess implements Action {
  public readonly type = CreditCardActionsTypes.PAY_FOR_ORDER_SUCCESS;
}

export class PayForOrderFailure implements Action {
  public readonly type = CreditCardActionsTypes.PAY_FOR_ORDER_FAILURE;

  constructor(public payload: Error) {
  }
}

export type CreditCardActions = AddCreditCard
  | AddCreditCardSuccess
  | AddCreditCardFailure
  | CreditCardSelect
  | PayForOrder
  | PayForOrderSuccess
  | PayForOrderFailure;
