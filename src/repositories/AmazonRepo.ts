import { RawAmazonRequestBody } from '../types/amazonTypes';
import { NewProduct } from '../types/productTypes';
import { Products } from '../models/Products';
import { sequelize, ProductsModel } from '../config/database-connection';

export const saveAmazonItem = (
    amazonItem: RawAmazonRequestBody,
    title?: string
) => {
    const transformedItem: NewProduct = {
        asin: amazonItem.asin,
        amazonTitle: amazonItem.title,
        imageUrl: '', // [matt] NEED IMAGEURL!!
        price: amazonItem.prices.priceAmazon || amazonItem.prices.priceNew,
        title: title || amazonItem.title,
        createdAt: new Date().toString(),
        createdBy: 'ME', // [matt] THIS NEEDS TO CHANGE
        updateSource: 'manual',
    };
    console.log(
        '\x1b[41m%s \x1b[0m',
        '[matt] transformedItem',
        transformedItem
    );
    sequelize.models.Products.create({
        ...transformedItem,
    })
        .then((result) => {
            console.log('\x1b[41m%s \x1b[0m', '[matt] result', result);
        })
        .catch((err) => console.log(err));
};
