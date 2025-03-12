import React from 'react';
import {Box, Select} from '@chakra-ui/react';

import {DatabaseEngine} from '@/types';

interface PricingTableFiltersProps {
  selectedDatabase: string;
  onDatabaseChange: (database: DatabaseEngine) => void;
}

export default function PricingTableFilters({
  selectedDatabase,
  onDatabaseChange,
}: PricingTableFiltersProps) {
  return (
    <Box mb={4}>
      <Select
        placeholder="Select Database"
        value={selectedDatabase}
        onChange={(e) => onDatabaseChange(e.target.value)}
      >
        <option value="PostgreSQL">PostgreSQL</option>
        <option value="MariaDB">MariaDB</option>
        <option value="SQL Server">SQL Server</option>
        <option value="Oracle">Oracle</option>
        <option value="MySQL">MySQL</option>
        <option value="Aurora PostgreSQL">Aurora PostgreSQL</option>
        <option value="Others">Others</option>
      </Select>
    </Box>
  );
}
