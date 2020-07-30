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

export interface PriceInfo {
    symbol: string;
    value: number;
    currency: string;
    raw: string;
}

export interface RawAmazonRequestBody {
    product: {
        asin: string;
        title: string;
        images: string[];
        main_image: { link: string };
        description: string;
        link: string;
        feature_bullets_flat: string;
        buybox_winner: {
            is_prime: boolean;
            condition: any;
            availability: any;
            fulfillment: any;
            price: PriceInfo;
            rrp: any;
            save: any;
            shipping: any;
        };
        prices: PriceInformation;
    };
}
