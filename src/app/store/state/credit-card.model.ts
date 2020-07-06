const DEFAULT_CARDS = [
  {
    id: 1,
    number: '4690482611759901',
    expiryDate: '01-03-2025',
    cardHolder: 'Janusz Kowalski',
    cvv: '745'
  },
  {
    id: 2,
    number: '5217580284012181',
    cardHolder: 'Janusz Kowalski',
    expiryDate: '01-12-2022',
    cvv: '443'
  }
] as CreditCard[];

export interface CreditCard {
  id: number;
  number: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
}

export interface CreditCardState {
  cards: CreditCard[];
  selectedCard: CreditCard;
  whileProcessing: boolean;
  error: Error;
}

export const initialCreditCardState: CreditCardState = {
  cards: DEFAULT_CARDS,
  selectedCard: DEFAULT_CARDS[0],
  whileProcessing: false,
  error: null
};


