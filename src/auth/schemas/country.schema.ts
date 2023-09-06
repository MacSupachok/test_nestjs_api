import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})


export class Country {

    @Prop()
    name: string ;
}

export const CountrySchema = SchemaFactory.createForClass(Country);