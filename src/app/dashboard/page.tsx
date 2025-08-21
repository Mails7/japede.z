'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCards } from '@/components/business/dashboard/StatsCards';
import { RecentOrders } from '@/components/business/dashboard/RecentOrders';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Store,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/business/use-auth';
import { useOrders } from '@/hooks/business/use-orders';

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  todayRevenue: number;
  totalCustomers: number;
}

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    setLoading(false);
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (orders.length > 0) {
      const today = new Date().toDateString();
      const todayOrders = orders.filter(order => 
        new Date(order.orderTime).toDateString() === today
      );
      
      const pendingOrders = orders.filter(order => 
        order.status === 'PENDING'
      );

      setStats({
        totalOrders: orders.length,
        pendingOrders: pendingOrders.length,
        todayRevenue: todayOrders.reduce((sum, order) => sum + order.totalAmount, 0),
        totalCustomers: new Set(orders.map(order => order.customerName)).size
      });
    }
  }, [orders]);

  if (loading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-orange-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">JáPede Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {user.profile?.fullName || user.name || user.email}
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={stats} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <RecentOrders orders={recentOrders} />
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  View Dashboard
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Utensils className="mr-2 h-4 w-4" />
                  Manage Menu
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Customers
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Server</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authentication</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}