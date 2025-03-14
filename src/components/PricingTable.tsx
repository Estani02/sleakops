'use client';

import React, {useEffect, useState} from 'react';
import useSWR from 'swr';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Stack,
  Skeleton,
  Heading,
  Select,
} from '@chakra-ui/react';
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {motion} from 'framer-motion';

import PricingTableFilters from './PricingTableFilters';
import ProductDetailsCard from './ProductDetailsCard';

import {Filters, PricingData} from '@/types';
import {databaseEngineOptions, onDemandPricingUnits} from '@/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PricingTable() {
  const {data: dataPricing, error, isLoading} = useSWR<PricingData>('/api/pricing', fetcher);
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [openSkus, setOpenSkus] = useState<string[]>([]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  if (error)
    return (
      <Box className="mx-auto mt-5 h-full min-w-5xl" color="red.500">
        <Heading as="p" noOfLines={1} size="md">
          Failed to load data
        </Heading>
        <Button mt={5} size="md" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  if (isLoading)
    return (
      <Stack className="mt-5" spacing={4}>
        <Skeleton height="40px" />
        <Skeleton height="220px" />
      </Stack>
    );

  const filteredData = dataPricing?.data?.filter((item) => {
    const memory = parseFloat(item.memory);
    const vcpu = parseInt(item.vcpu);
    const onDemandPricingPrice = item.pricing.onDemand?.pricePerUnit ?? 0;

    const hasAllRequiredFields =
      item.instanceType &&
      item.databaseEngine &&
      item.memory &&
      item.vcpu &&
      item.location &&
      item.pricing.onDemand?.pricePerUnit !== undefined;

    if (filters.allRequierdFields && !hasAllRequiredFields) {
      return false;
    }

    if (filters.database === 'Others') {
      return !databaseEngineOptions.includes(item.databaseEngine);
    }

    if (filters.onDemandPricingUnit === 'Others') {
      return !onDemandPricingUnits.includes(item.pricing.onDemand?.unit ?? '');
    }

    return (
      (filters.database ? item.databaseEngine === filters.database : true) &&
      (filters.memoryMin ? memory >= filters.memoryMin : true) &&
      (filters.memoryMax ? memory <= filters.memoryMax : true) &&
      (filters.vcpuMin ? vcpu >= filters.vcpuMin : true) &&
      (filters.vcpuMax ? vcpu <= filters.vcpuMax : true) &&
      (filters.onDemandPricingUnit
        ? item.pricing.onDemand?.unit === filters.onDemandPricingUnit
        : true) &&
      (filters.onDemandPricingPriceMin
        ? onDemandPricingPrice >= filters.onDemandPricingPriceMin
        : true) &&
      (filters.onDemandPricingPriceMax
        ? onDemandPricingPrice <= filters.onDemandPricingPriceMax
        : true)
    );
  });

  const totalItems = filteredData?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedData = filteredData?.slice((page - 1) * pageSize, page * pageSize);

  const toggleSku = (sku: string) => {
    setOpenSkus((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku],
    );
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
    setOpenSkus([]);
  };

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
    setOpenSkus([]);
  };

  return (
    <Box mt={5} mx="auto">
      <PricingTableFilters onFilterChange={setFilters} />
      <TableContainer border="1px solid #E2E8F0" borderRadius="md" overflowX="auto">
        <Table>
          <Thead>
            <Tr bg="#90CDF4" color="#2D3748">
              <Th />
              <Th>Instance</Th>
              <Th>Database</Th>
              <Th>Memory</Th>
              <Th>vCPU</Th>
              <Th>Location</Th>
              <Th textAlign="right">OnDemand Pricing</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData?.map((item) => (
              <React.Fragment key={item.sku}>
                <Tr>
                  <Td borderBottom="none">
                    <motion.button
                      animate={{rotate: openSkus.includes(item.sku) ? -180 : 0}}
                      transition={{duration: 0.3, ease: 'easeInOut'}}
                      type="button"
                      onClick={() => toggleSku(item.sku)}
                    >
                      <ChevronDownIcon />
                    </motion.button>
                  </Td>
                  <Td borderBottom="none">{item.instanceType ?? '-'}</Td>
                  <Td borderBottom="none">{item.databaseEngine}</Td>
                  <Td borderBottom="none">{item.memory ?? '-'}</Td>
                  <Td borderBottom="none">{item.vcpu ?? '-'}</Td>
                  <Td borderBottom="none">{item.location}</Td>
                  <Td borderBottom="none" textAlign="right">
                    ${item.pricing.onDemand?.pricePerUnit ?? 'N/A'}
                    {item.pricing.onDemand?.unit && '/' + item.pricing.onDemand?.unit}
                  </Td>
                </Tr>
                {openSkus.includes(item.sku) && (
                  <Tr>
                    <Td colSpan={7} style={{padding: 0}}>
                      <motion.div
                        animate={{height: 'auto'}}
                        initial={{height: 0}}
                        style={{overflow: 'hidden'}}
                        transition={{duration: 0.3, ease: 'easeInOut'}}
                      >
                        <ProductDetailsCard item={item} />
                      </motion.div>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Box
        className="flex-col items-center md:flex-row md:items-start"
        display="flex"
        gap={4}
        justifyContent="end"
        mt={4}
      >
        <Select
          className="cursor-pointer"
          mb={4}
          value={pageSize}
          width="fit-content"
          onChange={handlePageSizeChange}
        >
          {[5, 10, 15, 20, 25, 30].map((size) => (
            <option key={size} className="!bg-primary-light" value={size}>
              Rows per page {size}
            </option>
          ))}
        </Select>
        <Button isDisabled={page === 1} onClick={prevPage}>
          <ChevronLeftIcon />
        </Button>
        <Box p={2}>
          Page {page} of {totalPages}
        </Box>
        <Button isDisabled={page === totalPages} onClick={nextPage}>
          <ChevronRightIcon />
        </Button>
      </Box>
    </Box>
  );
}
