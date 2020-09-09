import { JsonController, Get } from 'routing-controllers';
import { getAllRefreshHistory } from '../repositories/RefreshHistoryRepo';

@JsonController()
export class RefreshHistoryController {
    @Get('/api/refresh-history')
    async getAllOrders() {
        return await getAllRefreshHistory();
    }
}
