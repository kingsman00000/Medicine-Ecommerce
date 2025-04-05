import { Order, OrderHistory, OrderStatus, Product } from '@/types';
import { fetchProducts } from './productService';

// Generate mock order data using real fetched products
const generateMockOrders = async (): Promise<Order[]> => {
  const products = await fetchProducts();

  if (!products || products.length === 0) {
    throw new Error('No products available to generate orders.');
  }

  // Create a range of dates for the orders (last 30 days)
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });

  const orders: Order[] = [];
  const statuses: OrderStatus[] = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  for (let i = 0; i < 5; i++) {
    const numProducts = Math.floor(Math.random() * 3) + 1;

    const orderItems = Array.from({ length: numProducts }, () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;

      return {
        ...randomProduct,
        quantity,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    orders.push({
      id: `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      items: orderItems,
      total,
      date: dates[Math.floor(Math.random() * dates.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return orders;
};

export const getOrders = async (): Promise<OrderHistory> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const savedOrders = localStorage.getItem('order_history');
  if (savedOrders) {
    try {
      return JSON.parse(savedOrders);
    } catch (error) {
      console.error('Failed to parse saved orders:', error);
      localStorage.removeItem('order_history');
    }
  }

  try {
    const mockOrders = await generateMockOrders();
    const orderHistory = { orders: mockOrders };
    localStorage.setItem('order_history', JSON.stringify(orderHistory));
    return orderHistory;
  } catch (error) {
    console.error('Failed to generate mock orders:', error);
    return { orders: [] };
  }
};

export const addOrder = async (order: Order): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const savedOrders = localStorage.getItem('order_history');
  let orderHistory: OrderHistory;

  if (savedOrders) {
    try {
      orderHistory = JSON.parse(savedOrders);
    } catch (error) {
      orderHistory = { orders: [] };
    }
  } else {
    orderHistory = { orders: [] };
  }

  orderHistory.orders.unshift(order);
  localStorage.setItem('order_history', JSON.stringify(orderHistory));
};
