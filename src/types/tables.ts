export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
  reservationCustomer?: string;
  reservationTime?: Date;
  reservationGuestCount?: number;
  reservationNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
  currentOrder?: Order;
}

export type TableStatus = 
  | 'AVAILABLE' 
  | 'OCCUPIED' 
  | 'RESERVED' 
  | 'NEEDS_CLEANING';

export interface CreateTableRequest {
  name: string;
  capacity: number;
}