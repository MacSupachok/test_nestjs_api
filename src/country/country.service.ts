import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryDto } from 'src/dto/country.dto';
import { Country } from 'src/auth/schemas/country.schema';

@Injectable()
export class CountryService {

    constructor(
        @InjectModel(Country.name)
        private countryModel: Model<Country>,
    ) { }

    // createCountry

    async create(countryDto: CountryDto): Promise<Country> {
        const { name } = countryDto;

        const duplicateCountry = await this.countryModel.findOne({ name });

        if (duplicateCountry) {
            throw new UnauthorizedException('This country name is already in use.');
        } else {
            const newCountry = await this.countryModel.create(countryDto);
            return newCountry;
        }
    }

    // async create(country: Country): Promise<Country> {
    //     const res = await this.countryModel.create(country);
    //     return res;
    // }

}
