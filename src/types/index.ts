export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  image: string;
  items: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
}

export interface OrderHistory {
  orders: Order[];
}