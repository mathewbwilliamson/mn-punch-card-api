import { Post, JsonController } from 'routing-controllers';
import { sendEmailForBuyingProduct } from '../services/EmailService';

@JsonController()
export class EmailController {
    @Post('/api/email/buyproduct')
    async buyProduct() {
        await sendEmailForBuyingProduct();
        return 'success';
    }
}
