import {IsEmail, IsNotEmpty, IsString, MinLength} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter correct email."})
    @ApiProperty({ description: 'The user\'s email', example: 'admin@gmail.com' })
    readonly email: string ;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({ description: 'The user\'s password', example: 'admin1234' })
    readonly password: string ;
}