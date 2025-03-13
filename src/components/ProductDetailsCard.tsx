import React from 'react';
import {Box, Heading, List, ListItem} from '@chakra-ui/react';

interface ProductDetailsCardProps {
  item: {
    servicename?: string;
    regionCode?: string;
    networkPerformance?: string;
    instanceFamily?: string;
    licenseModel?: string;
    physicalProcessor?: string;
    storage?: string;
    pricing: {
      reserved: Record<
        string,
        Record<string, {totalCost: number; upfrontFee: number; hourlyRate: number}>
      > | null;
    };
  };
}

export default function ProductDetailsCard({item}: ProductDetailsCardProps) {
  return (
    <div className="flex">
      <Box className="flex-1" p={6}>
        <div className="text-primary mb-2 w-fit rounded-md bg-white p-1.5">
          <Heading as="h3" size="sm">
            Product Details
          </Heading>
        </div>
        <List p={3} spacing={3}>
          {item.servicename && (
            <ListItem>
              <strong className="text-base capitalize">Service Name: </strong>
              {item.servicename}
            </ListItem>
          )}
          {item.regionCode && (
            <ListItem>
              <strong className="text-base capitalize">Region Code: </strong>
              {item.regionCode}
            </ListItem>
          )}
          {item.networkPerformance && (
            <ListItem>
              <strong className="text-base capitalize">Network Performance: </strong>
              {item.networkPerformance}
            </ListItem>
          )}
          {item.instanceFamily && (
            <ListItem>
              <strong className="text-base capitalize">Instance Family: </strong>
              {item.instanceFamily}
            </ListItem>
          )}
          {item.licenseModel && (
            <ListItem>
              <strong className="text-base capitalize">License Model: </strong>
              {item.licenseModel}
            </ListItem>
          )}
          {item.physicalProcessor && (
            <ListItem>
              <strong className="text-base capitalize">Physical Processor: </strong>
              {item.physicalProcessor}
            </ListItem>
          )}
          {item.storage && (
            <ListItem>
              <strong className="text-base capitalize">Storage: </strong>
              {item.storage}
            </ListItem>
          )}
        </List>
      </Box>
      <Box className="flex-1" p={6}>
        <div className="text-primary mb-2 w-fit rounded-md bg-white p-1.5">
          <Heading as="h3" size="sm">
            Pricing Details
          </Heading>
        </div>
        {item.pricing.reserved ? (
          Object.entries(item.pricing.reserved).map(([years, plans]) => (
            <Box key={years} borderRadius="md" p={3}>
              <strong className="underline">Reserva {years}</strong>
              {Object.entries(plans).map(([plan, details]) => (
                <Box key={plan} className="text-sm" mt={2}>
                  <strong className="text-base capitalize">{plan.replace('_', ' ')}:</strong> $
                  {details.totalCost} (Upfront: ${details.upfrontFee}, Rate: ${details.hourlyRate}
                  /hr)
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Box>There are no reserved options</Box>
        )}
      </Box>
    </div>
  );
}
