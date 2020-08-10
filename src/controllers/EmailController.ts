import { Post, JsonController, Body } from 'routing-controllers';
import { sendEmailForBuyingProduct } from '../services/EmailService';
import { NewOrder } from '../types/productTypes';

@JsonController()
export class EmailController {
    @Post('/api/email/buyproduct')
    async buyProduct(@Body() orderMessage: { newOrder: NewOrder }) {
        await sendEmailForBuyingProduct(orderMessage.newOrder);
        return 'success';
    }
}
