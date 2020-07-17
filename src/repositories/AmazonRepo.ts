import { RawAmazonRequestBody } from '../types/amazonTypes';
import { NewProduct } from '../types/productTypes';
import { sequelize } from '../config/database-connection';

export const saveAmazonItem = (
    amazonItem: RawAmazonRequestBody,
    title?: string
) => {
    const transformedItem: NewProduct = {
        asin: amazonItem.asin,
        amazonTitle: amazonItem.title,
        imageUrl:
            amazonItem.images &&
            amazonItem.images.length > 0 &&
            amazonItem.images[0],
        price: amazonItem.prices.current_price,
        title: title || amazonItem.title,
        createdAt: new Date().toString(),
        createdBy: 'ME', // [matt] THIS NEEDS TO CHANGE
        updateSource: 'manual',
    };

    sequelize.models.Products.create({
        ...transformedItem,
    }).catch((err) => console.log(err));
};

export const getAllProducts = () => {
    return sequelize.models.Products.findAll({
        where: {
            isDeleted: null,
        },
    });
};
