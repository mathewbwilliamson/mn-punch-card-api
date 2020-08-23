import { JsonController, Body, Get, Post } from 'routing-controllers';
import { NewUser } from '../types/userTypes';
import { registerUser } from '../services/UserService';

@JsonController()
export class UserController {
    @Post('/api/user/register')
    async registerUser(@Body() newUser: NewUser) {
        console.log('\x1b[42m%s \x1b[0m', '[matt] NAME', newUser.username);
        console.log('\x1b[42m%s \x1b[0m', '[matt] PASS', newUser.password);
        return await registerUser(newUser);
    }

    @Get('/api/user/login')
    async loginUser(@Body() userInformation: {}) {
        return 'success Login';
    }
}
