import { RawAmazonRequestBody } from '../types/amazonTypes';
import { NewProduct } from '../types/productTypes';
import { sequelize } from '../config/database-connection';

export const transformItem = (
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
    const thing = await sequelize.models.Products.findByPk(id);
    console.log('\x1b[41m%s \x1b[0m', '[matt] thing', thing);
    return await thing.destroy();
}

export const updateItemTitle = async (id: number, newTitle: string) => {
    return await sequelize.models.Products.update(
        { title: newTitle },
        { where: { id } }
    );
};
