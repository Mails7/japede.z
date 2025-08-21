'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store } from 'lucide-react';
import { LoginForm } from '@/components/business/auth/LoginForm';
import { RegisterForm } from '@/components/business/auth/RegisterForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Store className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">JáPede</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestão Restaurant</p>
        </div>

        <Card className="shadow-xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2024 JáPede. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}