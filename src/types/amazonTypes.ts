export interface PriceInformation {
    priceAmazon: number;
    priceNew?: number;
    priceUsed?: number;
}

export interface PriceWithCreation {
    createdAt: string;
    price: number;
}

export interface ExtendedPriceInformation {
    priceAmazon: PriceWithCreation;
    priceNew: PriceWithCreation;
    priceUsed: PriceWithCreation;
}

export interface RawAmazonRequestBody {
    asin: string;
    createdAt: string;
    currencySymbol: string;
    title: string;
    prices: PriceInformation;
    lastPrice: PriceInformation;
    highestPricing: ExtendedPriceInformation;
    lowestPricing: ExtendedPriceInformation;
}
