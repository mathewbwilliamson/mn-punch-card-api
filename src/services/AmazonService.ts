import {
    saveAmazonItem,
    updateItem,
    transformItem,
} from '../repositories/AmazonRepo';
import { RawAmazonRequestBody } from '../types/amazonTypes';
import axios from 'axios';

export const getAmazonItem = async (asin: string) => {
    const params = {
        api_key: process.env.RAINFOREST_KEY,
        type: 'product',
        amazon_domain: 'amazon.com',
        asin,
    };
    return (
        await axios({
            method: 'GET',
            url: 'https://api.rainforestapi.com/request',
            params,
        })
    ).data as RawAmazonRequestBody;
};

export const getAndSaveAmazonItem = async (asin: string, title?: string) => {
    const amazonItem = await getAmazonItem(asin);

    // need to call repo and save the item in the DB
    saveAmazonItem(amazonItem, title);
    return amazonItem;
};

export const getAmazonItemAndUpdate = async (id: number, asin: string) => {
    const amazonItem = await getAmazonItem(asin);
    const transformedItem = transformItem(amazonItem);
    return await updateItem(id, transformedItem);
};
