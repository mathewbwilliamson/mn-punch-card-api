import {
    JsonController,
    Body,
    Get,
    Post,
    Param,
    Put,
} from 'routing-controllers';
import { NewUser } from '../types/userTypes';
import { registerUser } from '../services/UserService';
import { authorizeUser } from '../repositories/UserRepo';

@JsonController()
export class UserController {
    @Post('/api/user/register')
    async registerUser(@Body() newUser: NewUser) {
        return await registerUser(newUser);
    }

    @Get('/api/user/login')
    async loginUser(@Body() userInformation: {}) {
        return 'success Login';
    }

    @Put('/api/user/authorize/:userId')
    async authorizeUser(@Param('userId') userId: string) {
        return authorizeUser(userId);
    }
}
