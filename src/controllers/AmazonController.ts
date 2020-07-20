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
import { getAmazonItem, getAndSaveAmazonItem } from '../services/AmazonService';
import {
    getAllProducts,
    transformItem,
    saveAmazonItem,
    saveItem,
} from '../repositories/AmazonRepo';
import { NewProduct } from '../types/productTypes';

@JsonController()
export class AmazonController {
    @Get('/api/amazon')
    async getAll() {
        return await getAllProducts();
    }

    @Post('/api/amazon')
    async postProduct(@Body() newProduct: NewProduct) {
        console.log('\x1b[41m%s \x1b[0m', '[matt] THIS IS NEW', newProduct);
        return await saveItem(newProduct);
    }

    @Get('/api/amazon/:asin')
    async get(@Param('asin') asin: string) {
        const asinQuery = asin;
        const rawAmazonItem = await getAmazonItem(asinQuery);
        return transformItem(rawAmazonItem);
    }

    // [matt] What's a better way to do this?
    @Post('/api/amazon/:asin')
    async post(
        @Param('asin') asin: string,
        @Body() titleBody: { title: string }
    ) {
        return await getAndSaveAmazonItem(asin, titleBody.title);
    }

    @Put('/users/:id')
    put(@Param('id') id: number, @Body() user: any) {
        return 'Updating a user...';
    }

    @Delete('/users/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...';
    }
}
