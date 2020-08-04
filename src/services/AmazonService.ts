import {
    saveAmazonItem,
    updateItem,
    transformItem,
    getAllProducts,
    getAllAsins,
} from '../repositories/AmazonRepo';
import { RawAmazonRequestBody } from '../types/amazonTypes';
import axios from 'axios';

export const getAmazonItem = async (asin: string) => {
    if (!asin) {
        return;
    }
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

export const getAmazonItemAndUpdate = async (
    id: number,
    asin: string,
    title?: string
) => {
    if (!id || !asin) {
        return;
    }
    try {
        let amazonItem = await getAmazonItem(asin);

        // The API kinda sucks so try the server multiple times on an item if it fails
        const n = 0;
        while (!amazonItem.request_info.success && n < 4) {
            await sleep(3000);
            console.log(
                '\x1b[41m%s \x1b[0m',
                '[matt] WHILE n, id, asin',
                n,
                id,
                asin
            );
            amazonItem = await getAmazonItem(asin);
        }
        if (!amazonItem.request_info.success) {
            console.log(
                '\x1b[41m%s \x1b[0m',
                '[matt] FULL FAIL n, id, asin',
                n,
                id,
                asin
            );

            throw new Error('Error from the server');
        }
        console.log(
            '\x1b[42m%s \x1b[0m',
            '[matt] amazonItem.request_info',
            amazonItem.request_info,
            amazonItem.product.asin,
            asin
        );
        const transformedItem = transformItem(amazonItem, title);
        return await updateItem(id, transformedItem);
    } catch (err) {
        throw err;
    }
};

const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const refreshAllItems = async () => {
    const allProducts = (await getAllAsins()) as [
        { asin: string; id: number; title: string }[],
        string
    ];

    return await Promise.all(
        allProducts[0].map(async (item) => {
            await sleep(300);
            if (!!item) {
                const newItem = item as {
                    asin: string;
                    id: number;
                    title: string;
                };
                return await getAmazonItemAndUpdate(
                    newItem.id,
                    newItem.asin,
                    newItem.title
                );
            }
        })
    );
};
