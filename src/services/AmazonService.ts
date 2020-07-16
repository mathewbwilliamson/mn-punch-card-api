import unirest from 'unirest';

export const getAmazonItem = async (asin: string) => {
    return await unirest
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
        .end((apiResponse: any) => {
            if (apiResponse.error) {
                throw new Error(apiResponse.error);
            }
            return apiResponse.body;
        });
};
