import React, {useState} from 'react';
import {Box, Button, Input, Select} from '@chakra-ui/react';

import {FilterKeys, Filters} from '@/types';
import {databaseEngineOptions, onDemandPricingUnits} from '@/constants';

interface PricingTableFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const databaseOptions = databaseEngineOptions.map((db) => ({
  label: db,
  value: db,
}));

const onDemandPricingUnitsOptions = onDemandPricingUnits.map((unit) => ({
  label: unit,
  value: unit,
}));

export default function PricingTableFilters({onFilterChange}: PricingTableFiltersProps) {
  const [filters, setFilters] = useState<Filters>({});

  const handleChange = (key: FilterKeys, value: string | number | undefined) => {
    const newFilters = {...filters, [key]: value || undefined};

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <Box className="flex flex-col justify-between gap-1.5 lg:flex-row lg:gap-5" mb={4}>
      <div className="lg:w-72">
        <label className="text-sm font-semibold" htmlFor="database">
          Select Databases
        </label>
        <Select
          mt={1}
          placeholder="All databases"
          value={filters.database || ''}
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
        <label className="text-sm font-semibold" htmlFor="memory">
          Memory (GB)
        </label>
        <div className="flex items-center gap-2.5 md:gap-1.5 lg:w-40">
          <Input
            mt={1}
            placeholder="Min"
            value={filters.memoryMin || ''}
            onChange={(e) =>
              handleChange('memoryMin', e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <span>-</span>
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
      <div>
        <label className="text-sm font-semibold" htmlFor="vcpu">
          vCPU
        </label>
        <div className="flex items-center gap-2.5 md:gap-1.5 lg:w-40">
          <Input
            mt={1}
            placeholder="Min"
            value={filters.vcpuMin || ''}
            onChange={(e) =>
              handleChange('vcpuMin', e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <span>-</span>
          <Input
            mt={1}
            placeholder="Max"
            value={filters.vcpuMax || ''}
            onChange={(e) =>
              handleChange('vcpuMax', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
      </div>
      <div>
        <label className="line-clamp-1 text-sm font-semibold" htmlFor="onDemandPricingUnit">
          On-Demand Pricing Unit
        </label>
        <Select
          mt={1}
          placeholder="All units"
          value={filters.onDemandPricingUnit || ''}
          onChange={(e) => handleChange('onDemandPricingUnit', e.target.value)}
        >
          {onDemandPricingUnitsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label className="line-clamp-1 text-sm font-semibold" htmlFor="onDemandPricingPrice">
          On-Demand Pricing Price
        </label>
        <div className="flex items-center gap-2.5 md:gap-1.5 lg:w-52">
          <Input
            mt={1}
            placeholder="Min"
            value={filters.onDemandPricingPriceMin || ''}
            onChange={(e) => handleChange('onDemandPricingPriceMin', e.target.value)}
          />
          <span>-</span>
          <Input
            mt={1}
            placeholder="Max"
            value={filters.onDemandPricingPriceMax || ''}
            onChange={(e) => handleChange('onDemandPricingPriceMax', e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="text-transparent">Clear</p>
        <Button className="w-full lg:mt-1 lg:w-28" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>
    </Box>
  );
}
