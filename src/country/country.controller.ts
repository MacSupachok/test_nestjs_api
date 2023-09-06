import { Body, Controller, Post } from '@nestjs/common';
import { CountryDto } from 'src/dto/country.dto';
import { CountryService } from './country.service';
import { Country } from 'src/auth/schemas/country.schema';

@Controller('country')
export class CountryController {
    constructor(private countryService: CountryService) { }

    @Post('/create')
    async create(@Body() country: CountryDto): Promise<Country> {
        return this.countryService.create(country);
    }
}
