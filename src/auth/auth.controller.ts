import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/user.schema';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    SignUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    @ApiResponse({ status: 200, description: 'User logged in successfully.'})
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Get('/getUser')
    @ApiHeader({ name: 'Authorization', description: 'Bearer token', required: true })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'List of users', type: User })
    async getAllUsers(): Promise<User[]> {
        return this.authService.getAllUsers();
    }


}

