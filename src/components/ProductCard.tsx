'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { ShoppingCart, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { purchaseProduct } from '@/services/purchaseService';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export function ProductCard({ product }: { product: Product }) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { addToCart } = useCart();
  const router = useRouter();

  const handlePurchase = async () => {
    if (isPurchasing) return;

    setIsPurchasing(true);
    setPurchaseStatus('loading');

    try {
      const { orderId } = await purchaseProduct(product);
      setPurchaseStatus('success');

      // Add to cart
      addToCart(product);

      toast.success('Purchase completed!', {
        description: `Order ID: ${orderId}`,
        action: {
          label: 'View Cart',
          onClick: () => {
            router.push('/cart');
          },
        },
      });

      // Reset after a brief delay
      setTimeout(() => {
        setPurchaseStatus('idle');
        setIsPurchasing(false);
      }, 2000);

    } catch (error) {
      setPurchaseStatus('error');

      toast.error('Purchase failed', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });

      // Reset after a brief delay
      setTimeout(() => {
        setPurchaseStatus('idle');
        setIsPurchasing(false);
      }, 2000);
    }
  };

  const getButtonContent = () => {
    switch (purchaseStatus) {
      case 'loading':
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        );
      case 'success':
        return (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added to Cart
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4" />
            Try Again
          </>
        );
      default:
        return (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy Now
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (purchaseStatus) {
      case 'success': return 'secondary' as const;
      case 'error': return 'destructive' as const;
      default: return 'default' as const;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover transition-transform duration-300 hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-bold tracking-tight mt-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.manufacturer}</p>
        <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full transition-all duration-300 ${purchaseStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : ''}`}
          variant={getButtonVariant()}
          onClick={handlePurchase}
          disabled={isPurchasing}
        >
          {getButtonContent()}
        </Button>
      </CardFooter>
    </Card>
  );
}
