export interface AppSettings {
  id: string;
  storeName: string;
  logoUrl?: string;
  phoneNumber: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement?: string;
  addressNeighborhood: string;
  addressCity: string;
  addressPostalCode: string;
  storeTimezone: string;
  
  // Opening Hours
  mondayEnabled: boolean;
  mondayOpen: string;
  mondayClose: string;
  tuesdayEnabled: boolean;
  tuesdayOpen: string;
  tuesdayClose: string;
  wednesdayEnabled: boolean;
  wednesdayOpen: string;
  wednesdayClose: string;
  thursdayEnabled: boolean;
  thursdayOpen: string;
  thursdayClose: string;
  fridayEnabled: boolean;
  fridayOpen: string;
  fridayClose: string;
  saturdayEnabled: boolean;
  saturdayOpen: string;
  saturdayClose: string;
  sundayEnabled: boolean;
  sundayOpen: string;
  sundayClose: string;
  
  // Delivery Settings
  deliveryFeeType: 'fixed' | 'per_km' | 'free' | 'free_above_value';
  deliveryFeeFixedAmount: number;
  deliveryFeeAmountPerKm: number;
  deliveryFeeMinOrderForFree: number;
  minOrderValueDelivery: number;
  
  // Payment Settings
  acceptCash: boolean;
  acceptCreditCard: boolean;
  acceptDebitCard: boolean;
  acceptPix: boolean;
  pixKeyType?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  pixKey?: string;
  
  // WhatsApp Settings
  whatsappNotificationsEnabled: boolean;
  whatsappApiUrl?: string;
  whatsappApiToken?: string;
  
  // Notification Settings
  soundAlertNewOrderAdmin: boolean;
  soundNewOrderUrl: string;
  predefinedSoundKey: string;
  emailAdminNewOrder?: string;
  
  // Order Flow Durations
  orderFlowMesaPending: number;
  orderFlowMesaPreparing: number;
  orderFlowMesaReadyForPickup: number;
  orderFlowDeliveryPending: number;
  orderFlowDeliveryPreparing: number;
  orderFlowDeliveryReadyForPickup: number;
  orderFlowDeliveryOutForDelivery: number;
  orderFlowBalcaoPending: number;
  orderFlowBalcaoPreparing: number;
  orderFlowBalcaoReadyForPickup: number;
  
  n8nApiKey?: string;
  createdAt: Date;
  updatedAt: Date;
}