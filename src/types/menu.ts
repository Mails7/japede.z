export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  menuItems?: MenuItem[];
  _count?: {
    menuItems: number;
  };
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  available: boolean;
  itemType: 'standard' | 'pizza';
  sendToKitchen: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  pizzaSizes?: PizzaSize[];
  pizzaCrusts?: PizzaCrust[];
}

export interface PizzaSize {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  menuItem?: MenuItem;
  pizzaCrusts?: PizzaCrust[];
}

export interface PizzaCrust {
  id: string;
  menuItemId?: string;
  pizzaSizeId?: string;
  name: string;
  additionalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  menuItem?: MenuItem;
  pizzaSize?: PizzaSize;
}

export interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  available?: boolean;
  itemType?: 'standard' | 'pizza';
  sendToKitchen?: boolean;
  pizzaSizes?: Array<{
    name: string;
    price: number;
    pizzaCrusts?: Array<{
      name: string;
      additionalPrice?: number;
    }>;
  }>;
  pizzaCrusts?: Array<{
    name: string;
    additionalPrice?: number;
  }>;
}