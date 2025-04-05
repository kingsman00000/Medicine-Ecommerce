'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Order, OrderStatus } from '@/types';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadgeClasses = (status: OrderStatus) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'Processing':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Shipped':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'Delivered':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <Card className="mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 py-4">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <h3 className="font-medium">Order {order.id}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className={getStatusBadgeClasses(order.status)}>
            {order.status}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatDate(order.date)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </p>
            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
          </div>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
          >
            <span>View Details</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <h4 className="font-medium text-sm">Order Items</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.manufacturer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    <p className="font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold mt-3">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
