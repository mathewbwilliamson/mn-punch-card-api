import { RawAmazonRequestBody } from '../types/amazonTypes';
import { NewProduct } from '../types/productTypes';
import { calculateRewardCardPrice } from '../utils/calculateRewardCardPrice';
import { Products } from '../../models/Products';
import db from '../../models';

export const transformItem = (
    amazonItem: RawAmazonRequestBody,
    title?: string
) => {
    const transformedItem: NewProduct = {
        asin: amazonItem.product.asin,
        amazonTitle: amazonItem.product.title,
        imageUrl: amazonItem.product.main_image.link,
        price: Math.ceil(amazonItem.product.buybox_winner.price.value),
        rewardCardPrice: calculateRewardCardPrice(
            amazonItem.product.buybox_winner.price.value
        ),
        title: title || amazonItem.product.title,
        link: amazonItem.product.link,
        createdAt: new Date().toString(),
        createdBy: 'ME', // [matt] THIS NEEDS TO CHANGE
        updateSource: 'manual',
    };
    return transformedItem;
};

export const saveAmazonItem = (
    amazonItem: RawAmazonRequestBody,
    title?: string
) => {
    const transformedItem = transformItem(amazonItem, title);
    saveItem(transformedItem);
};

export function saveItem(amazonItem: NewProduct) {
    return Products.create(amazonItem).catch((err) => console.log(err));
}

export const getAllProducts = () => {
    return Products.findAll({
        where: {
            isDeleted: null,
        },
        raw: true,
    });
};

export const getAllAsins = () => {
    return db.sequelize.query(
        'SELECT asin, id, title FROM Products WHERE isDeleted IS NULL'
    );
};

export async function deleteItem(id: number) {
    return await Products.destroy({ where: { id } });
}

export const updateItemTitle = async (id: number, newTitle: string) => {
    return await Products.update({ title: newTitle }, { where: { id } });
};

export const updateItem = async (id: number, amazonItem: NewProduct) => {
    await Products.update(amazonItem, {
        where: { id },
    });
    return amazonItem;
};
