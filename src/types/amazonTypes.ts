export interface PriceInformation {
    current_price: number;
    previous_price: number;
    checkout_discount: number;
    currency: string;
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
    error: boolean;
    asin: string;
    title: string;
    images: string[];
    full_link: string;
    description: string;
    prices: PriceInformation;
    prime: boolean;
    amazon_choice: boolean;
    out_of_stock: boolean;
}
