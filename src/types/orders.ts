export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  totalAmount: number;
  status: OrderStatus;
  orderTime: Date;
  notes?: string;
  lastStatusChangeTime: Date;
  nextAutoTransitionTime?: Date;
  autoProgress: boolean;
  currentProgressPercent?: number;
  orderType: OrderType;
  tableId?: string;
  paymentMethod?: PaymentMethod;
  amountPaid?: number;
  changeDue?: number;
  cashRegisterSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
  customer?: Profile;
  items?: OrderItem[];
  table?: Table;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  name: string;
  price: number;
  selectedSizeId?: string;
  selectedCrustId?: string;
  isHalfAndHalf: boolean;
  firstHalfFlavorName?: string;
  firstHalfFlavorPrice?: number;
  secondHalfFlavorName?: string;
  secondHalfFlavorPrice?: number;
  createdAt: Date;
  updatedAt: Date;
  menuItem?: MenuItem;
  selectedSize?: PizzaSize;
  selectedCrust?: PizzaCrust;
}

export type OrderStatus = 
  | 'PENDING' 
  | 'PREPARING' 
  | 'READY_FOR_PICKUP' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED';

export type OrderType = 'MESA' | 'DELIVERY' | 'BALCAO';

export type PaymentMethod = 
  | 'DINHEIRO' 
  | 'CARTAO_DEBITO' 
  | 'CARTAO_CREDITO' 
  | 'PIX' 
  | 'MULTIPLO';

export interface CreateOrderRequest {
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
    name: string;
    price: number;
    selectedSize?: PizzaSize;
    selectedCrust?: PizzaCrust;
    isHalfAndHalf?: boolean;
    firstHalfFlavorName?: string;
    firstHalfFlavorPrice?: number;
    secondHalfFlavorName?: string;
    secondHalfFlavorPrice?: number;
  }>;
  orderType?: OrderType;
  tableId?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  amountPaid?: number;
}