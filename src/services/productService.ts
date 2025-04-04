import type { Product } from '@/types';

const API_URL = 'http://192.168.1.47:8002/api/v2/document/Item Price?fields=["*"]';
const AUTH_TOKEN = '0d6ae3e548eb109:cb5db955cbbd2c0';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${AUTH_TOKEN}`, // Auth header added
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format received');
    }

    return data.data.map((item: any) => ({
      id: item.item_code,
      name: item.item_name,
      manufacturer: 'Mediversal',
      price: item.price_list_rate || 0, // Default to 0 if missing
      image: '/favicon.ico',
      items: 1,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
