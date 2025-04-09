export type Violation = {
  id: number;
  type: string;
  timestamp: string;
  location: string;
  imageUrl: string;
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