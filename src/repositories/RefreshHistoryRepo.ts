import { NewProduct } from '../types/productTypes';
import {
    RefreshHistoryCreationAttributes,
    RefreshHistory,
} from '../../models/RefreshHistory';
import { AmazonRequestInfo } from '../types/amazonTypes';

export function saveItemInRefreshHistory(
    productToSave: NewProduct,
    requestInfo: AmazonRequestInfo
) {
    const newRefreshHistoryProduct: RefreshHistoryCreationAttributes = {
        errorMessage: `${requestInfo.message}`,
        asin: productToSave.asin,
        success: `${requestInfo.success}`,
    };
    return RefreshHistory.create(newRefreshHistoryProduct).catch((err) =>
        console.log(err)
    );
}
