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

@JsonController()
export class AmazonController {
    @Get('/api/amazon')
    getAll() {
        return 'This action returns all users';
    }

    @Get('/api/amazon/:asin')
    async get(@Param('asin') asin: string) {
        const asinQuery = asin;
        return await getAmazonItem(asinQuery);
    }

    // [matt] THIS NEEDS AN OPTIONAL TITLE to be passed in
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
