export enum PrintJobStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PRINTED = 'PRINTED',
  REJECTED = 'REJECTED',
}

export enum PrintJobSource {
  AGENT = 'AGENT',
  PRINT_SERVER = 'PRINT_SERVER',
}

export enum PrintPricingType {
  BW = 'BW',
  COLOR = 'COLOR',
}

export enum TransactionType {
  TIME = 'TIME',
  PRINT = 'PRINT',
  SERVICE = 'SERVICE',
  AI = 'AI',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  MPESA = 'MPESA',
}
