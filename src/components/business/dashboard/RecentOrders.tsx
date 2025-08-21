'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Utensils, Store, ShoppingCart } from 'lucide-react';
import type { Order } from '@/types';

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING': return 'bg-blue-100 text-blue-800';
      case 'READY_FOR_PICKUP': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderTypeIcon = (type: string) => {
    switch (type) {
      case 'MESA': return <Utensils className="h-4 w-4" />;
      case 'DELIVERY': return <Store className="h-4 w-4" />;
      case 'BALCAO': return <ShoppingCart className="h-4 w-4" />;
      default: return <ShoppingCart className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest orders in the system</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getOrderTypeIcon(order.orderType)}
                  </div>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <div className="text-right">
                    <p className="font-medium">R$ {order.totalAmount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{order.orderType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}