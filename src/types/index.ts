export interface ReservedPricingData {
  upfrontFee: number;
  hourlyRate: number;
  totalCost: number;
}

export interface ReservedPricing {
  [leaseTerm: string]: {
    [purchaseOption: string]: ReservedPricingData;
  };
}

export interface onDemandPricing {
  unit: string;
  pricePerUnit: number;
}

export interface ResData {
  sku: string;
  instanceType?: string;
  databaseEngine: DatabaseEngine;
  memory: string;
  vcpu: string;
  deploymentOption: string;
  location: string;
  pricing: {
    onDemand: onDemandPricing | null;
    reserved: ReservedPricing | null;
  };
}

export interface PricingData {
  data: ResData[];
}

export type DatabaseEngine =
  | 'PostgreSQL'
  | 'MariaDB'
  | 'SQL Server'
  | 'Oracle'
  | 'MySQL'
  | 'Aurora PostgreSQL'
  | string;
