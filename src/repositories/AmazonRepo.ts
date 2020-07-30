import { RawAmazonRequestBody } from '../types/amazonTypes';
import { NewProduct, Product } from '../types/productTypes';
import { sequelize } from '../config/database-connection';

export const transformItem = (
    amazonItem: RawAmazonRequestBody,
    title?: string
) => {
    const transformedItem: NewProduct = {
        asin: amazonItem.product.asin,
        amazonTitle: amazonItem.product.title,
        imageUrl: amazonItem.product.main_image.link,
        price: amazonItem.product.buybox_winner.price.value,
        title: title || amazonItem.product.title,
        link: amazonItem.product.link,
        createdAt: new Date().toString(),
        createdBy: 'ME', // [matt] THIS NEEDS TO CHANGE
        updateSource: 'manual',
    };
    console.log(
        '\x1b[42m%s \x1b[0m',
        '[matt] transformedItem',
        transformedItem
    );
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

// [matt] THIS NEEDS TO BE CHANGED
export const updateItem = async (id: number, amazonItem: NewProduct) => {
    console.log('\x1b[42m%s \x1b[0m', '[matt] amazonItem', amazonItem);
    return await sequelize.models.Products.update(amazonItem, {
        where: { id },
    });
};
