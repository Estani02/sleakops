import {ResData, ReservedPricing} from '@/types';

export const dynamic = 'force-static';

export interface PricingData {
  products: Record<string, Product>;
  terms: Terms;
}

export interface Product {
  sku: string;
  productFamily: string;
  attributes: ProductAttributes;
}

export interface ProductAttributes {
  servicecode: string;
  location: string;
  instanceType?: string;
  engineCode: string;
  databaseEngine: string;
  usagetype: string;
  memory: string;
  vcpu: string;
  deploymentOption: string;
  licenseModel?: string;
  instanceFamily?: string;
  physicalProcessor?: string;
  storage?: string;
  networkPerformance?: string;
  regionCode?: string;
  servicename?: string;
}

export interface Terms {
  OnDemand: Record<string, Record<string, OnDemandTerm>>;
  Reserved?: Record<string, Record<string, ReservedTerm>>;
}

interface PricePerUnit {
  USD: string;
}

interface TermAttributes {
  LeaseContractLength: string;
  PurchaseOption: PurchaseOption;
  OfferingClass: string;
}

interface OnDemandTerm {
  sku: string;
  effectiveDate: string;
  priceDimensions: Record<string, PriceDimension>;
  termAttributes: TermAttributes;
}

interface ReservedTerm extends OnDemandTerm {
  offerTermCode: string;
}

interface PriceDimension {
  rateCode: string;
  description: string;
  beginRange?: string;
  endRange?: string;
  unit: string;
  pricePerUnit: PricePerUnit;
  appliesTo: string[];
}

type PurchaseOption = 'No Upfront' | 'Partial Upfront' | 'All Upfront';

export async function GET() {
  try {
    const response = await fetch(
      'https://sleakops-interview-tests.s3.us-east-1.amazonaws.com/rds_us_east_1_pricing.json',
    );
    const data: PricingData = await response.json();

    function parseAwsPricing(jsonData: PricingData): ResData[] {
      const {products, terms} = jsonData;
      const result: ResData[] = [];

      for (const sku in products) {
        const product = products[sku];
        const attributes = product.attributes;

        const productData: ResData = {
          sku,
          instanceType: attributes.instanceType,
          databaseEngine: attributes.databaseEngine,
          memory: attributes.memory,
          vcpu: attributes.vcpu,
          deploymentOption: attributes.deploymentOption,
          location: attributes.location,
          licenseModel: attributes.licenseModel,
          instanceFamily: attributes.instanceFamily,
          physicalProcessor: attributes.physicalProcessor,
          storage: attributes.storage,
          networkPerformance: attributes.networkPerformance,
          regionCode: attributes.regionCode,
          servicename: attributes.servicename,
          pricing: {
            onDemand: null,
            reserved: null,
          },
        };

        if (terms.OnDemand[sku]) {
          const onDemandTerms = Object.values(terms.OnDemand[sku])[0];
          const priceDimensions = Object.values(onDemandTerms.priceDimensions);

          productData.pricing.onDemand = {unit: '', pricePerUnit: 0};

          for (const dimension of priceDimensions) {
            const unit = dimension.unit;
            const price = parseFloat(dimension.pricePerUnit.USD);

            if (!isNaN(price)) {
              if (productData.pricing.onDemand) {
                productData.pricing.onDemand.pricePerUnit = price;
              }
              productData.pricing.onDemand.unit = unit;
            }
          }
        }

        if (terms.Reserved && terms.Reserved[sku]) {
          const reservedPricing = terms.Reserved[sku];

          const reservedData: ReservedPricing = {};

          for (const offerTermCode in reservedPricing) {
            const reserved = reservedPricing[offerTermCode];

            const leaseTerm = reserved.termAttributes.LeaseContractLength;
            const purchaseOption = reserved.termAttributes.PurchaseOption.toLowerCase().replace(
              /\s+/g,
              '_',
            );

            let upfrontFee = 0;
            let hourlyRate = 0;

            for (const key in reserved.priceDimensions) {
              const dimension = reserved.priceDimensions[key];

              if (dimension.unit === 'Quantity') {
                upfrontFee = parseFloat(dimension.pricePerUnit.USD);
              } else if (dimension.unit === 'Hrs') {
                hourlyRate = parseFloat(dimension.pricePerUnit.USD);
              }
            }

            const totalHours = leaseTerm === '1yr' ? 8760 : 26280;
            const totalCost = upfrontFee + hourlyRate * totalHours;

            if (!reservedData[leaseTerm]) {
              reservedData[leaseTerm] = {};
            }

            reservedData[leaseTerm][purchaseOption] = {
              upfrontFee,
              hourlyRate,
              totalCost,
            };
          }

          productData.pricing.reserved = reservedData;
        }

        result.push(productData);
      }

      return result;
    }

    return Response.json({data: parseAwsPricing(data)});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.error();
  }
}
