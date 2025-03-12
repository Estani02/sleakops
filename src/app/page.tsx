import {Heading} from '@chakra-ui/react';

import PricingTable from '@/components/PricingTable';

export default function Home() {
  return (
    <main className="bg-primary-light min-h-screen py-12 text-white">
      <section className="mx-auto max-w-7xl px-8">
        <Heading as="h1" noOfLines={1} size="2xl">
          Sleakops
        </Heading>
        <PricingTable />
      </section>
    </main>
  );
}
