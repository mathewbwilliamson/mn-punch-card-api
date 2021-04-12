import { NewProduct, Product } from "../types/productTypes";
import {
  RefreshHistoryCreationAttributes,
  RefreshHistory,
  RefreshHistoryAttributes,
} from "../../models/RefreshHistory";
import { ItemError } from "../types/amazonTypes";
import { logger } from "../index";
import db from "../../models";
import dayjs from "dayjs";

export function saveItemInRefreshHistory(
  productToSave: NewProduct,
  requestInfo: ItemError,
  oldProduct?: Partial<Product>
) {
  const newRefreshHistoryProduct: RefreshHistoryCreationAttributes = {
    errorMessage: `${requestInfo.errorMessage}`,
    asin: productToSave.asin,
    success: `${requestInfo.success}`,
    newRewardCardPrice: isNaN(productToSave.rewardCardPrice)
      ? 0
      : productToSave.rewardCardPrice,
    oldRewardCardPrice: oldProduct.rewardCardPrice,
  };

  return RefreshHistory.create(newRefreshHistoryProduct).catch((err) =>
    logger.error(err)
  );
}

export async function getAllRefreshHistory() {
  return (
    await RefreshHistory.findAll({
      raw: true,
    })
  ).map((item) => {
    return { ...item, success: Boolean(item.success) };
  });
}

/**
 * Gets the last time that Refresh All has run
 */
const refreshHistoryLastUpdated = async () => {
  return (
    await db.sequelize.query(
      "SELECT id, createdAt FROM RefreshHistories ORDER BY createdAt DESC"
    )
  )[0] as Pick<RefreshHistoryAttributes, "id" | "createdAt">[];
};

/**
 * If refreshHistory was run too soon, don't run again.
 */
export const isRefreshHistoryReadyToRun = async () => {
  const lastUpdated = (await refreshHistoryLastUpdated())[0].createdAt;
  const isInLastFiveMinutes = dayjs()
    .subtract(5, "minute")
    .isBefore(dayjs(lastUpdated));
  return !isInLastFiveMinutes;
};
