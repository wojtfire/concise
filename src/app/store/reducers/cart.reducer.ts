import {CartState, initialCartState} from '../state/cart.model';
import {CartActions, CartActionsTypes} from '../actions/cart.actions';

export function cartReducer(
  state: CartState = initialCartState,
  action: CartActions
): CartState {
  switch (action.type) {
    case CartActionsTypes.DELETE_CART_ITEM:
      return {
        ...state,
        whileProcessing: true
      };
    case CartActionsTypes.DELETE_CART_ITEM_SUCCESS:
      const filetered = state.products.filter(product => product.product.id !== action.payload.cartItemId);
      return {
        ...state,
        products: filetered,
        whileProcessing: false
      };
    case CartActionsTypes.DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        whileProcessing: false
      };
    case CartActionsTypes.SET_CART_ITEM_QUANTITY:
      return {
        ...state,
        whileProcessing: true
      };
    case CartActionsTypes.SET_CART_ITEM_QUANTITY_SUCCESS:
      const arr = state.products.map(product => {
        if (action.payload.product.id === product.product.id) {
          return action.payload;
        }
        return product;
      });
      return {
        ...state,
        products: arr,
        whileProcessing: false
      };
    case CartActionsTypes.SET_CART_ITEM_QUANTITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        whileProcessing: false
      };
    default:
      return state;
  }
};
