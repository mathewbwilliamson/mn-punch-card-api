import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
} from 'routing-controllers';
import { amazonRequest } from '../services/AmazonService';

@Controller()
export class AmazonController {
    @Get('/api/amazon')
    getAll() {
        return 'This action returns all users';
    }

    @Get('/api/amazon/:asin')
    async get(@Param('asin') asin: string) {
        const asinQuery = asin;
        return await amazonRequest(asinQuery);
    }

    @Post('/users')
    post(@Body() user: any) {
        return 'Saving user...';
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
