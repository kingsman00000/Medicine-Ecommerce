import type { Product } from '@/types';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Noise-Cancelling Headphones',
    manufacturer: 'AudioTech',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: '2',
    name: 'Ultra HD Smart TV 55"',
    manufacturer: 'VisionElectronics',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80',
  },
  {
    id: '3',
    name: 'Professional DSLR Camera',
    manufacturer: 'OptiLens',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    manufacturer: 'ComfortSeating',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505843490701-5be5d0b19d16?w=500&q=80',
  },
  {
    id: '5',
    name: 'Stainless Steel Blender',
    manufacturer: 'KitchenPro',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1570222094288-7d7e04ec6a18?w=500&q=80',
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    manufacturer: 'GamerTech',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80',
  },
  {
    id: '7',
    name: 'Smart Fitness Tracker',
    manufacturer: 'HealthWear',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500&q=80',
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    manufacturer: 'SoundWave',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
  },
];

// Function to simulate API fetch with a delay
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate random failure (1 in 10 chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch products');
  }

  return [...mockProducts];
};
