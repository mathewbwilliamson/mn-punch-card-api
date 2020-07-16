import { RawAmazonRequestBody } from '../types/amazonTypes';

export const saveAmazonItem = (amazonItem: RawAmazonRequestBody) => {
    console.log('\x1b[41m%s \x1b[0m', '[matt] amazonItem', amazonItem);
};
