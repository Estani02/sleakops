import React, {useState} from 'react';
import {Box, Input, Select} from '@chakra-ui/react';

import {FilterKeys, Filters} from '@/types';
import {databaseEngineOptions} from '@/constants';

interface PricingTableFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const databaseOptions = databaseEngineOptions.map((db) => ({
  label: db,
  value: db,
}));

databaseOptions.push({label: 'Others', value: 'Others'});

export default function PricingTableFilters({onFilterChange}: PricingTableFiltersProps) {
  const [filters, setFilters] = useState<Filters>({});

  const handleChange = (key: FilterKeys, value: string | number | undefined) => {
    const newFilters = {...filters, [key]: value || undefined};

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box className="flex flex-col gap-1.5" mb={4}>
      <div className="w-72">
        <label htmlFor="database">Select Databases</label>
        <Select
          mt={1}
          placeholder="All databases"
          value={filters.database}
          onChange={(e) => handleChange('database', e.target.value)}
        >
          {databaseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label htmlFor="memory">Memory (GB)</label>
        <div className="flex w-52 gap-2.5">
          <Input
            mt={1}
            placeholder="Min"
            value={filters.memoryMin || ''}
            onChange={(e) =>
              handleChange('memoryMin', e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <Input
            mt={1}
            placeholder="Max"
            value={filters.memoryMax || ''}
            onChange={(e) =>
              handleChange('memoryMax', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
      </div>
    </Box>
  );
}
