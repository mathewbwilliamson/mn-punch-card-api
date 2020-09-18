import {
    saveAmazonItem,
    updateItem,
    transformItem,
    getAllProducts,
    getAllAsins,
} from '../repositories/AmazonRepo';
import { RawAmazonRequestBody, ItemError } from '../types/amazonTypes';
import axios from 'axios';
import {
    RainforestAccountRequest,
    RainforestAccountData,
} from '../types/generalTypes';
import { getSeedAmazonItem, getAllSeedAsins } from '../seed/seedDataForTesting';
import { saveItemInRefreshHistory } from '../repositories/RefreshHistoryRepo';
import { NewProduct } from '../types/productTypes';

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

export const getUsage = async () => {
    const params = {
        api_key: process.env.RAINFOREST_KEY,
    };
    const rainforestAccountReq = (
        await axios({
            method: 'GET',
            url: 'https://api.rainforestapi.com/account',
            params,
        })
    ).data as RainforestAccountRequest;

    return {
        creditsUsed: rainforestAccountReq.account_info.credits_used,
        creditsRemaining: rainforestAccountReq.account_info.credits_remaining,
        creditsLimit: rainforestAccountReq.account_info.credits_limit,
        overageLimit: rainforestAccountReq.account_info.overage_limit,
        overageUsed: rainforestAccountReq.account_info.overage_used,
    } as RainforestAccountData;
};

export const getAndSaveAmazonItem = async (asin: string, title?: string) => {
    const amazonItem = await getAmazonItem(asin);

    // need to call repo and save the item in the DB
    saveAmazonItem(amazonItem, title);
    return amazonItem;
};

export const getItemError = (
    item: NewProduct,
    amazonItem: RawAmazonRequestBody
) => {
    if (isNaN(item.price)) {
        return 'The price does not exist.';
    }
    if (amazonItem.request_info.message) {
        return amazonItem.request_info.message;
    }
};

/**
 * Used for RefreshAll
 * @param id
 * @param asin
 * @param title
 */
export const getAmazonItemAndUpdate = async (
    id: number,
    asin: string,
    title?: string
) => {
    if (!id || !asin) {
        return;
    }
    try {
        let amazonItem = (await getAmazonItem(asin)) as RawAmazonRequestBody;
        // let amazonItem = (await getSeedAmazonItem(
        //     asin
        // )) as RawAmazonRequestBody; // [matt] REMOVE

        // The API kinda sucks so try the server multiple times on an item if it fails
        let n = 0;
        while (!amazonItem.request_info.success && n < 4) {
            await sleep(3000);
            amazonItem = await getAmazonItem(asin);
            // amazonItem = await getSeedAmazonItem(asin); // [matt] REMOVE
            n += 1;
        }

        const transformedItem = transformItem(amazonItem, title);

        const errorMessage = getItemError(transformedItem, amazonItem);
        const error: ItemError = {
            errorMessage,
            success: !errorMessage,
        };

        await saveItemInRefreshHistory(transformedItem, error);

        if (!error.success) {
            return error;
        }

        if (!error?.errorMessage) {
            return await updateItem(id, transformedItem);
        }
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
    // const allSeedProducts = getAllSeedAsins; // [matt] REMOVE

    /**
     * Get every item in turn.
     */
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
