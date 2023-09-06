import { ApiProperty } from "@nestjs/swagger";

export class CountryDto {
    @ApiProperty({ description: 'The country name', example: 'Bangkok' })
    readonly name: string ;
}