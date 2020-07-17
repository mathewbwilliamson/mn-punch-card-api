import unirest from 'unirest';
import { saveAmazonItem } from '../repositories/AmazonRepo';
import { RawAmazonRequestBody } from '../types/amazonTypes';

export const getAmazonItem = async (asin: string) => {
    return (await unirest
        .get('https://amazon-price1.p.rapidapi.com/priceReport')
        .query({
            asin,
            marketplace: 'US',
        })
        .header({
            'x-rapidapi-host': 'amazon-price1.p.rapidapi.com',
            'x-rapidapi-key':
                'baa201456amshfc3a4b8c4e76b2bp13db6cjsnc31bfcd08549',
            useQueryString: true,
        })
        .end((apiResponse: UnirestResponse<RawAmazonRequestBody>) => {
            if (apiResponse.error) {
                throw new Error(apiResponse.error);
            }
            return apiResponse.body;
        })) as UnirestResponse<RawAmazonRequestBody>;
};

export const getAndSaveAmazonItem = async (asin: string) => {
    const amazonItem = await getAmazonItem(asin);

    // need to call repo and save the item in the DB
    saveAmazonItem(amazonItem.body);
    return amazonItem;
};
