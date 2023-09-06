import {IsEmail, IsNotEmpty, IsString, MinLength} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The user\'s name', example: 'admin' })
    readonly name: string ;

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter correct email."})
    @ApiProperty({ description: 'The user\'s email address', example: 'admin@gmail.com' })
    readonly email: string ;

    @IsString()
    @ApiProperty({ description: 'The user\'s country id', example: '64f7645587d83c9140df3dd9' })
    readonly country: string ;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({ description: 'The user\'s password', example: 'admin1234' })
    readonly password: string ;
}