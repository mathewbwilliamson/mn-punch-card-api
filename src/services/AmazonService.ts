import { saveAmazonItem } from '../repositories/AmazonRepo';
import { RawAmazonRequestBody } from '../types/amazonTypes';
import axios from 'axios';

export const getAmazonItem = async (asin: string) => {
    return (
        await axios({
            method: 'GET',
            url: 'https://amazon-products1.p.rapidapi.com/product',
            headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-host': 'amazon-products1.p.rapidapi.com',
                'x-rapidapi-key':
                    'baa201456amshfc3a4b8c4e76b2bp13db6cjsnc31bfcd08549',
                useQueryString: true,
            },
            params: {
                country: 'US',
                asin,
            },
        })
    ).data;
};

export const getAndSaveAmazonItem = async (asin: string, title?: string) => {
    const amazonItem = await getAmazonItem(asin);
    console.log('\x1b[41m%s \x1b[0m', '[matt] amazonItem', amazonItem);

    // need to call repo and save the item in the DB
    saveAmazonItem(amazonItem, title);
    return amazonItem;
};
