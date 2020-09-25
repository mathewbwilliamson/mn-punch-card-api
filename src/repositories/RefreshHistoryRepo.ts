import { NewProduct } from '../types/productTypes';
import {
    RefreshHistoryCreationAttributes,
    RefreshHistory,
} from '../../models/RefreshHistory';
import { AmazonRequestInfo, ItemError } from '../types/amazonTypes';

export function saveItemInRefreshHistory(
    productToSave: NewProduct,
    requestInfo: ItemError
) {
    const newRefreshHistoryProduct: RefreshHistoryCreationAttributes = {
        errorMessage: `${requestInfo.errorMessage}`,
        asin: productToSave.asin,
        success: `${requestInfo.success}`,
    };

    return RefreshHistory.create(newRefreshHistoryProduct).catch((err) =>
        console.log(err)
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
