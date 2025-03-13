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
  licenseModel?: string;
  instanceFamily?: string;
  physicalProcessor?: string;
  storage?: string;
  networkPerformance?: string;
  regionCode?: string;
  servicename?: string;
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
  | 'Aurora MySQL'
  | 'Aurora PostgreSQL'
  | 'Db2'
  | 'SQL Server (on-premise for Outpost)'
  | 'PostgreSQL (on-premise for Outpost)'
  | string;

export interface Filters {
  database?: DatabaseEngine;
  memoryMin?: number;
  memoryMax?: number;
  vcpuMin?: number;
  vcpuMax?: number;
  onDemandPricingUnit?: string;
  onDemandPricingPriceMin?: number;
  onDemandPricingPriceMax?: number;
}

export type FilterKeys = keyof Filters;
