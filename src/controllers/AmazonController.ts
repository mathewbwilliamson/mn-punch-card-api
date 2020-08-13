import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    JsonController,
} from 'routing-controllers';
import {
    getAmazonItem,
    getAndSaveAmazonItem,
    getAmazonItemAndUpdate,
    refreshAllItems,
} from '../services/AmazonService';
import {
    getAllProducts,
    transformItem,
    saveAmazonItem,
    saveItem,
    deleteItem,
    updateItemTitle,
} from '../repositories/AmazonRepo';
import { NewProduct } from '../types/productTypes';

@JsonController()
export class AmazonController {
    @Post('/api/amazon/refresh')
    async refreshAll() {
        return await refreshAllItems();
    }

    @Get('/api/amazon')
    async getAll() {
        return await getAllProducts();
    }

    @Post('/api/amazon')
    async postProduct(@Body() newProduct: NewProduct) {
        return await saveItem(newProduct);
    }

    @Get('/api/amazon/:asin')
    async get(@Param('asin') asin: string) {
        console.log('\x1b[42m%s \x1b[0m', '[matt] GET api/amazon/asin', asin);

        const asinQuery = asin;
        const rawAmazonItem = await getAmazonItem(asinQuery);
        return transformItem(rawAmazonItem);
    }

    @Post('/api/amazon/:asin')
    async post(
        @Param('asin') asin: string,
        @Body() titleBody: { title: string }
    ) {
        console.log('\x1b[42m%s \x1b[0m', '[matt] POST api/amazon/asin', asin);

        return await getAndSaveAmazonItem(asin, titleBody.title);
    }

    @Post('/api/amazon/refresh/:id')
    async refresh(
        @Param('id') id: number,
        @Body() titleBody: { asin: string }
    ) {
        return await getAmazonItemAndUpdate(id, titleBody.asin);
    }

    @Put('/api/amazon/:id')
    async put(@Param('id') id: number, @Body() titleBody: { title: string }) {
        return await updateItemTitle(id, titleBody.title);
    }

    @Delete('/api/amazon/:id')
    async remove(@Param('id') id: number) {
        return await deleteItem(id);
    }
}
