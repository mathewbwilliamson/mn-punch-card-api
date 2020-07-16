import express from 'express';
const router = express.Router();
import unirest from 'unirest';

router.get('/api/testme', async (req, res, next) => {
    console.log('\x1b[41m%s \x1b[0m', '[matt] are we here??? TESTME ROUTE');
});

router.get('/api/amazon', async (req, res, next) => {
    const asinQuery = req.query && req.query.asin;

    console.log('\x1b[41m%s \x1b[0m', '[matt] TEST ROUTE', asinQuery);
    await unirest
        .get('https://amazon-price1.p.rapidapi.com/priceReport')
        .query({
            asin: asinQuery,
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

            res.send(apiResponse.body);
        });
});

export default router;
