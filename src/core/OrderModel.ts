export type TOrder = {
  entityNumber: number;
  provider: string;
  date: Date;
  total?: number;
  percentageStatus?: number;
};

export type TOrderDetails = {
  isValid: boolean;
  description: string;
  amount: number;
};

export type TOrderLines = TOrderDetails[];
