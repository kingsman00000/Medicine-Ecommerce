import type { Product } from '@/types';

// Function to simulate a purchase API request
export const purchaseProduct = async (product: Product): Promise<{ orderId: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate random failure (1 in 10 chance)
  if (Math.random() < 0.1) {
    throw new Error('Purchase failed. Please try again.');
  }

  // Generate a random order ID
  const orderId = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return { orderId };
};
