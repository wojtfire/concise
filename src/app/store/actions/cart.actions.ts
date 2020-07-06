import {CartItem} from '../state/cart.model';
import {Action} from '@ngrx/store';

export enum CartActionsTypes {
  DELETE_CART_ITEM = '[Cart] Delete cart item',
  DELETE_CART_ITEM_SUCCESS = '[Cart] Delete cart item success',
  DELETE_CART_ITEM_FAILURE = '[Cart] Delete cart item failure',
  SET_CART_ITEM_QUANTITY = '[Cart] Set product quantity',
  SET_CART_ITEM_QUANTITY_SUCCESS = '[Cart] Set product quantity success',
  SET_CART_ITEM_QUANTITY_FAILURE = '[Cart] Set product quantity failure',
}

export class DeleteCartItem implements Action {
  public readonly type = CartActionsTypes.DELETE_CART_ITEM;

  constructor(public payload: { cartItemId: number }) {
  }
}

export class DeleteCartItemSuccess implements Action {
  public readonly type = CartActionsTypes.DELETE_CART_ITEM_SUCCESS;

  constructor(public payload: { cartItemId: number }) {
  }
}

export class DeleteCartItemFailure implements Action {
  public readonly type = CartActionsTypes.DELETE_CART_ITEM_FAILURE;

  constructor(public payload: Error) {
  }
}

export class SetCartItemQuantity implements Action {
  public readonly type = CartActionsTypes.SET_CART_ITEM_QUANTITY;

  constructor(public payload: { product: CartItem, quantity: number }) {
  }
}

export class SetCartItemQuantitySuccess implements Action {
  public readonly type = CartActionsTypes.SET_CART_ITEM_QUANTITY_SUCCESS;

  constructor(public payload: CartItem) {
  }
}

export class SetCartItemQuantityFailure implements Action {
  public readonly type = CartActionsTypes.SET_CART_ITEM_QUANTITY_FAILURE;

  constructor(public payload: Error) {
  }
}

export type CartActions = DeleteCartItem
  | DeleteCartItemSuccess
  | DeleteCartItemFailure
  | SetCartItemQuantity
  | SetCartItemQuantitySuccess
  | SetCartItemQuantityFailure;
