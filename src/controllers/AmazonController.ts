import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    BodyParam,
    JsonController,
} from 'routing-controllers';
import { getAmazonItem, getAndSaveAmazonItem } from '../services/AmazonService';
import { getAllProducts } from '../repositories/AmazonRepo';

@JsonController()
export class AmazonController {
    @Get('/api/amazon')
    async getAll() {
        return await getAllProducts();
    }

    @Get('/api/amazon/:asin')
    async get(@Param('asin') asin: string) {
        const asinQuery = asin;
        return await getAmazonItem(asinQuery);
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
