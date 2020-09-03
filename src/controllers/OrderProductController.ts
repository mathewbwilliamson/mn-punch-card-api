import { JsonController, Get } from 'routing-controllers';
import { getAllOrders } from '../repositories/OrderProductRepo';

@JsonController()
export class OrderProductController {
    @Get('/api/orderproduct')
    async getAllOrders() {
        return await getAllOrders();
    }
}
