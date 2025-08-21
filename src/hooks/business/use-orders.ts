'use client';

import { useState, useEffect } from 'react';
import type { Order, CreateOrderRequest, ApiResponse } from '@/types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async (filters?: {
    status?: string;
    orderType?: string;
  }) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token');
      }

      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.orderType) params.append('orderType', filters.orderType);

      const response = await fetch(`/api/orders?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data: ApiResponse<Order[]> = await response.json();

      if (data.success && data.data) {
        setOrders(data.data);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: CreateOrderRequest): Promise<boolean> => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token');
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      const data: ApiResponse<Order> = await response.json();

      if (data.success && data.data) {
        setOrders(prev => [data.data!, ...prev]);
        return true;
      } else {
        setError(data.error || 'Failed to create order');
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token');
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });

      const data: ApiResponse<Order> = await response.json();

      if (data.success && data.data) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? data.data! : order
        ));
        return true;
      } else {
        setError(data.error || 'Failed to update order');
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrderStatus,
    setError
  };
}