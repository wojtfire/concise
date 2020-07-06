import {CreditCardState, initialCreditCardState} from '../state/credit-card.model';
import {CreditCardActions, CreditCardActionsTypes} from '../actions/credit-card.action';

export function creditCardReducer(
  state: CreditCardState = initialCreditCardState,
  action: CreditCardActions
): CreditCardState {
  switch (action.type) {
    case CreditCardActionsTypes.ADD_CREDIT_CARD:
      return {
        ...state,
        whileProcessing: true
      };
    case CreditCardActionsTypes.ADD_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.find(card => card.number === action.payload.number) ? state.cards : [...state.cards, action.payload],
        whileProcessing: false
      };
    case CreditCardActionsTypes.ADD_CREDIT_CARD_FAILURE:
      return {
        ...state,
        error: action.payload,
        whileProcessing: false
      };
    case CreditCardActionsTypes.CREDIT_CARD_SELECT:
      return {
        ...state,
        selectedCard: action.payload
      };
    case CreditCardActionsTypes.PAY_FOR_ORDER:
      return {
        ...state,
        whileProcessing: true
      };
    case CreditCardActionsTypes.PAY_FOR_ORDER_SUCCESS:
      return {
        ...state,
        whileProcessing: false
      };
    case CreditCardActionsTypes.PAY_FOR_ORDER_FAILURE:
      return {
        ...state,
        whileProcessing: false,
        error: action.payload
      };
    default:
      return state;
  }
};
