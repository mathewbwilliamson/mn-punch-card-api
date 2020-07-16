import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
} from 'routing-controllers';
import { getAmazonItem, getAndSaveAmazonItem } from '../services/AmazonService';

@Controller()
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

    @Post('/api/amazon/:asin')
    async post(@Param('asin') asin: string) {
        return await getAndSaveAmazonItem(asin);
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
