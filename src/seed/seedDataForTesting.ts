export const seedDataForTesting = {
    100: {
        request_info: {
            success: true,
            credits_used: 100,
            credits_remaining: 200,
        },
        product: {
            asin: 100,
            title: 'title string',
            images: ['image1'],
            main_image: { link: 'main image' },
            description: 'this is the description for 100',
            link: 'http://thisisatest.com/100',
            feature_bullets_flat: 'dunno what this is',
            buybox_winner: {
                is_prime: true,
                condition: 'test condition',
                availability: 'available',
                fulfillment: 'dunno',
                price: {
                    symbol: 'symbol',
                    value: 12,
                    currency: '$12',
                    raw: 'test raw',
                },
                rrp: 'rrp',
                save: 'save',
                shipping: 'shipping',
            },
            prices: {
                current_price: 12,
                previous_price: 10,
                checkout_discount: 10,
                currency: '$12',
            },
        },
    },
    102: {
        request_info: {
            success: true,
            credits_used: 100,
            credits_remaining: 200,
        },
        product: {
            asin: 102,
            title: 'title string',
            images: ['image1'],
            main_image: { link: 'main image' },
            description: 'this is the description for 102',
            link: 'http://thisisatest.com/102',
            feature_bullets_flat: 'dunno what this is',
            buybox_winner: {
                is_prime: true,
                condition: 'test condition',
                availability: 'available',
                fulfillment: 'dunno',
                price: {
                    symbol: 'symbol',
                    value: 12,
                    currency: '$12',
                    raw: 'test raw',
                },
                rrp: 'rrp',
                save: 'save',
                shipping: 'shipping',
            },
            prices: {
                current_price: 30,
                previous_price: 25,
                checkout_discount: 25,
                currency: '$30',
            },
        },
    },
    103: {
        request_info: {
            success: true,
            credits_used: 100,
            credits_remaining: 200,
        },
        product: {
            asin: 103,
            title: 'title string',
            images: ['image1'],
            main_image: { link: 'main image' },
            description: 'this is the description for 103',
            link: 'http://thisisatest.com/103',
            feature_bullets_flat: 'dunno what this is',
            buybox_winner: {
                is_prime: true,
                condition: 'test condition',
                availability: 'available',
                fulfillment: 'dunno',
                price: {
                    symbol: 'symbol',
                    value: 12,
                    currency: '$12',
                    raw: 'test raw',
                },
                rrp: 'rrp',
                save: 'save',
                shipping: 'shipping',
            },
            prices: {
                current_price: 24,
                previous_price: 20,
                checkout_discount: 20,
                currency: '$24',
            },
        },
    },
    104: {
        request_info: {
            success: true,
            credits_used: 100,
            credits_remaining: 200,
        },
        product: {
            asin: 104,
            title: 'title string',
            images: ['image1'],
            main_image: { link: 'main image' },
            description: 'this is the description for 104',
            link: 'http://thisisatest.com/104',
            feature_bullets_flat: 'dunno what this is',
            buybox_winner: {
                is_prime: true,
                condition: 'test condition',
                availability: 'available',
                fulfillment: 'dunno',
                price: {
                    symbol: 'symbol',
                    value: 12,
                    currency: '$12',
                    raw: 'test raw',
                },
                rrp: 'rrp',
                save: 'save',
                shipping: 'shipping',
            },
            prices: {
                current_price: 26,
                previous_price: 22,
                checkout_discount: 22,
                currency: '$26',
            },
        },
    },
    105: {
        request_info: {
            success: false,
            credits_used: 100,
            credits_remaining: 200,
        },
        product: {
            asin: 105,
            title: 'title string',
            images: ['image1'],
            main_image: { link: 'main image' },
            description: 'this is the description for 105',
            link: 'http://thisisatest.com/105',
            feature_bullets_flat: 'dunno what this is',
            buybox_winner: {
                is_prime: true,
                condition: 'test condition',
                availability: 'available',
                fulfillment: 'dunno',
                price: {
                    symbol: 'symbol',
                    value: 12,
                    currency: '$12',
                    raw: 'test raw',
                },
                rrp: 'rrp',
                save: 'save',
                shipping: 'shipping',
            },
            prices: {
                current_price: 26,
                previous_price: 22,
                checkout_discount: 22,
                currency: '$26',
            },
        },
    },
};

export const allSeedProducts = [
    { asin: '100', id: 1, title: 'old title 100' },
    { asin: '102', id: 2, title: 'old title 102' },
    { asin: '103', id: 3, title: 'old title 103' },
    { asin: '104', id: 4, title: 'old title 104' },
    { asin: '105', id: 5, title: 'old title 105' },
];

export const getAllSeedAsins = [allSeedProducts, 'hi'] as [
    { asin: string; id: number; title: string }[],
    string
];

export const getSeedAmazonItem = (asin: string) => {
    return (seedDataForTesting as any)[asin];
};
