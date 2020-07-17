import { RawAmazonRequestBody } from '../types/amazonTypes';
import { NewProduct } from '../types/productTypes';

export const saveAmazonItem = (
    amazonItem: RawAmazonRequestBody,
    title?: string
) => {
    const transformedItem: NewProduct = {
        asin: amazonItem.asin,
        amazonTitle: amazonItem.title,
        imageUrl: '',
        price: amazonItem.prices.priceAmazon,
        title: title || amazonItem.title,
    };
    console.log(
        '\x1b[41m%s \x1b[0m',
        '[matt] transformedItem',
        transformedItem
    );
};
