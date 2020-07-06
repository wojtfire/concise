const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Standing desk frame UpLift',
    price: 349,
    pictureUrl: '/assets/images/desk_frame.webp',
    refNumber: '0011383471',
    color: 'Grey'
  },
  {
    id: 2,
    name: 'Desk top UpLift - 130 x 60 cm',
    price: 99,
    pictureUrl: '/assets/images/desk_top.webp',
    refNumber: '0174442171',
    color: 'Brown wood'
  },
  {
    id: 3,
    name: 'Monitor 24" Philips P24VHE FullHD',
    price: 299,
    pictureUrl: '/assets/images/monitor.png',
    refNumber: '0254392591',
    color: 'Black'
  },
  {
    id: 4,
    name: 'Cable organizer TOPK 5m',
    price: 9.99,
    pictureUrl: '/assets/images/cable_organizer.jpg',
    refNumber: '003499659',
    color: 'Black'
  }
] as Product[];

// Product interface and state only used for clarity. Product logic has not been implemented.

export interface Product {
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  refNumber: string;
  color: string;
}

export interface ProductState {
  products: Product[];
}

export const initialProductState: ProductState = {
  products: DEFAULT_PRODUCTS
};


