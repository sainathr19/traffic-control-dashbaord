export type Violation = {
  id: number;
  type: string;
  timestamp: string;
  location: string;
  imageBase64: string; 
  fine: number;
  vehicleNumber: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  paymentLink?: string;
};

export type Stats = {
  tripleRiding: number;
  noHelmet: number;
  totalViolations: number;
};