import { Post, JsonController, Body, Get } from 'routing-controllers';
import { sendEmailForBuyingProduct } from '../services/EmailService';
import { NewOrder } from '../types/productTypes';
import { saveProductOrder } from '../repositories/OrderProductRepo';

@JsonController()
export class EmailController {
    @Post('/api/email/buyproduct')
    async buyProduct(@Body() orderMessage: { newOrder: NewOrder }) {
        await sendEmailForBuyingProduct(orderMessage.newOrder);
        await saveProductOrder(orderMessage.newOrder);
        return "success";
    }

    @Get('/api/email')
    async getAllOrders() {
        return 'success';
    }
}
