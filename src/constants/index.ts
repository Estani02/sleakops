import {DatabaseEngine} from '@/types';

export const databaseEngineOptions: DatabaseEngine[] = [
  'PostgreSQL',
  'MariaDB',
  'SQL Server',
  'Oracle',
  'MySQL',
  'Aurora MySQL',
  'Aurora PostgreSQL',
  'Db2',
  'SQL Server (on-premise for Outpost)',
  'PostgreSQL (on-premise for Outpost)',
  'MySQL (on-premise for Outpost)',
  'Others',
];

export const onDemandPricingUnits = [
  'Hrs',
  'GB-Mo',
  'GB',
  'MBPS-Mo',
  'IOs',
  'vCPU-Months',
  'vCPU-Hours',
  'vCPU-hour',
  'API Calls',
  'IOPS-Mo',
  'CR-Hr',
  'ACU-Hr',
  'ACU-hour',
  'ACU-Months',
].sort();
