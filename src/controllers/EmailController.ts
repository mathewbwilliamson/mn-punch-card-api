import { Post, JsonController, Body } from 'routing-controllers';
import { sendEmailForBuyingProduct } from '../services/EmailService';

@JsonController()
export class EmailController {
    @Post('/api/email/buyproduct')
    async buyProduct(@Body() orderMessage: any) {
        // [matt] FIX THIS ANY
        await sendEmailForBuyingProduct(orderMessage);
        return 'success';
    }
}
