interface PurchaseRequest {
    productId: number;
    price: number;
    qty: number;
  }
  
  interface PurchaseResponse {
    success: boolean;
    message: string;
    orderId?: string;
  }
  
  /**
   * Send a purchase request to the server
   * In a real application, this would connect to an actual API endpoint
   */
  export async function purchaseProduct(productId: number, price: number, qty: number = 1): Promise<PurchaseResponse> {
    const payload = {
     customer: "Rakshit Sinha",
      delivery_date: new Date().toISOString().split("T")[0], // Set today's date
      items: [
        {
          item_code: productId.toString(), // Assuming productId is the item_code
          qty: 1,
          rate: price,
        },
      ],
    };
  
    try {
      // In a real app, this would be your actual API endpoint
      const response = await fetch('http://192.168.1.47:8002/api/resource/Sales Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "token 0d6ae3e548eb109:cb5db955cbbd2c0"
        },
        body: JSON.stringify(payload),
      });
  
      // Since we're using a mock API, we'll simulate a successful response
      // In a real app, you would parse the actual response
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
      // Create a mock success response
      const mockSuccessResponse: PurchaseResponse = {
        success: true,
        message: 'Purchase successful',
        orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
      };
  
      return mockSuccessResponse;
  
    } catch (error) {
      console.error('Error purchasing product:', error);
      return {
        success: false,
        message: 'Failed to process purchase. Please try again.',
      };
    }
  }
  