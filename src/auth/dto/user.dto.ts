import { ApiProperty } from "@nestjs/swagger";


export class UserDataDto {
    @ApiProperty({ description: 'The user\'s name', example: 'admin' })
    name: string;
    email: string;
    country: string;
}