import { Order, OrderHistory, OrderStatus, Product } from '@/types';
import { fetchProducts } from './productService';

const SALES_ORDER_API = 'http://192.168.1.47:8002/api/resource/Sales Order?fields=["*"]';
const AUTH_TOKEN = '0d6ae3e548eb109:cb5db955cbbd2c0';

// Generate mock order data using real fetched products
const generateMockOrders = async (): Promise<Order[]> => {
  const products = await fetchProducts();

  if (!products || products.length === 0) {
    throw new Error('No products available to generate orders.');
  }

  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });

  const statuses: OrderStatus[] = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const orders: Order[] = [];

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

    const total = orderItems.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0);

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
  try {
    const response = await fetch(SALES_ORDER_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const data = await response.json();

    // 👇 Safely handle both array and single object formats
    const rawOrders = Array.isArray(data.data) ? data.data : [data.data];

    const orders: Order[] = rawOrders.map((order: any) => {
      const items = (order.items || []).map((item: any) => ({
        id: item.item_code ?? item.name,
        name: item.item_name ?? 'Unnamed Product',
        price: Number(item.rate ?? 0),
        quantity: Number(item.qty ?? 1),
        image: item.image || '/Mediversal.png',
        manufacturer: item.brand ?? order.company ?? 'Unknown',
      }));

      const total = Number(order.rounded_total ?? order.grand_total ?? 0);

      return {
        id: order.name,
        items,
        total,
        date: order.transaction_date ?? new Date().toISOString().split('T')[0],
        status: order.status ?? 'Processing',
      };
    });

    return { orders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { orders: [] };
  }
};

export const addOrder = async (order: Order): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const savedOrders = localStorage.getItem('order_history');
  let orderHistory: OrderHistory;

  try {
    orderHistory = savedOrders ? JSON.parse(savedOrders) : { orders: [] };
  } catch {
    orderHistory = { orders: [] };
  }

  orderHistory.orders.unshift(order);
  localStorage.setItem('order_history', JSON.stringify(orderHistory));
};
