import { RawAmazonRequestBody } from '../types/amazonTypes';
import { NewProduct, Product } from '../types/productTypes';
import { sequelize } from '../config/database-connection';
import { calculateRewardCardPrice } from '../utils/calculateRewardCardPrice';

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
    return sequelize.models.Products.create(amazonItem).catch((err) =>
        console.log(err)
    );
}

export const getAllProducts = () => {
    return sequelize.models.Products.findAll({
        where: {
            isDeleted: null,
        },
        raw: true,
    });
};

export async function deleteItem(id: number) {
    return await sequelize.models.Products.destroy({ where: { id } });
}

export const updateItemTitle = async (id: number, newTitle: string) => {
    return await sequelize.models.Products.update(
        { title: newTitle },
        { where: { id } }
    );
};

export const updateItem = async (id: number, amazonItem: NewProduct) => {
    await sequelize.models.Products.update(amazonItem, {
        where: { id },
    });
    return amazonItem;
};
