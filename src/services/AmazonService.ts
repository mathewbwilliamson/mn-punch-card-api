import {
  saveAmazonItem,
  updateItem,
  transformItem,
  getAllProducts,
  getProductMetadata,
  getSingleProduct,
} from "../repositories/AmazonRepo";
import { RawAmazonRequestBody, ItemError } from "../types/amazonTypes";
import axios from "axios";
import {
  RainforestAccountRequest,
  RainforestAccountData,
} from "../types/generalTypes";
import { getSeedAmazonItem, getAllSeedAsins } from "../seed/seedDataForTesting";
import {
  isRefreshHistoryReadyToRun,
  saveItemInRefreshHistory,
} from "../repositories/RefreshHistoryRepo";
import { NewProduct, Product } from "../types/productTypes";
import { logger } from "../index";

export const getAmazonItem = async (asin: string) => {
  if (!asin) {
    return;
  }
  const params = {
    api_key: process.env.RAINFOREST_KEY,
    type: "product",
    amazon_domain: "amazon.com",
    asin,
  };
  return (
    await axios({
      method: "GET",
      url: "https://api.rainforestapi.com/request",
      params,
    })
  ).data as RawAmazonRequestBody;
};

// [matt] DONE
export const getUsage = async () => {
  const params = {
    api_key: process.env.RAINFOREST_KEY,
  };
  const rainforestAccountReq = (
    await axios({
      method: "GET",
      url: "https://api.rainforestapi.com/account",
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
  amazonItem: RawAmazonRequestBody,
  item?: NewProduct
) => {
  if (!amazonItem.request_info.success && amazonItem.request_info.message) {
    return amazonItem.request_info.message.slice(0, 60);
  }

  if (isNaN(item.price)) {
    return "The price does not exist.";
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
  title?: string,
  oldProduct?: Partial<Product>
) => {
  if (!id || !asin) {
    return;
  }
  try {
    let amazonItem = (await getAmazonItem(asin)) as RawAmazonRequestBody;
    // The API kinda sucks so try the server multiple times on an item if it fails
    // Note, one time there was so many failures that half of the things were gone!
    let n = 0;
    while (!amazonItem.request_info.success && n < 1) {
      await sleep(3000);
      amazonItem = await getAmazonItem(asin);
      n += 1;
    }
    const transformedItem =
      !!amazonItem.request_info.success && transformItem(amazonItem, title);

    const errorMessage = getItemError(amazonItem, transformedItem);
    const errorObject: ItemError = {
      errorMessage,
      success: !errorMessage,
    };

    await saveItemInRefreshHistory(transformedItem, errorObject, oldProduct);

    if (!errorObject.success) {
      return errorObject;
    }

    if (!errorObject?.errorMessage) {
      return await updateItem(id, transformedItem);
    }
  } catch (err) {
    throw err;
  }
};

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const refreshSingleItem = async (
  id: number,
  newAsin: string,
  newTitle?: string
) => {
  const oldProduct = await getSingleProduct(id);
  return await getAmazonItemAndUpdate(id, newAsin, newTitle, oldProduct);
};

export const refreshAllItems = async () => {
  const usage = await getUsage();
  logger.info(
    `The refresh is going to happen with the following starting points: Credits Remaining = ${usage.creditsRemaining} and Credits Used = ${usage.creditsUsed}.`
  );
  const isRefreshReady = await isRefreshHistoryReadyToRun();

  if (!isRefreshReady) {
    return Promise.resolve([]);
  }

  const allProducts = (await getProductMetadata()) as [
    Pick<Product, "id" | "asin" | "title" | "rewardCardPrice">[],
    string
  ];
  /**
   * Get every item in turn.
   */
  const awaitedProductsData = await Promise.all(
    allProducts[0].map(async (item) => {
      await sleep(300);
      if (!!item) {
        const oldProduct = item;
        return await getAmazonItemAndUpdate(
          oldProduct.id,
          oldProduct.asin,
          oldProduct.title,
          oldProduct
        );
      }
    })
  );

  const postUsage = await getUsage();
  logger.info(
    `The refresh has happened with the following end points: Credits Remaining = ${postUsage.creditsRemaining} and Credits Used = ${postUsage.creditsUsed}.`
  );
  return awaitedProductsData;
};
