import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";




@Schema({
    timestamps: true
})


export class User {

    @Prop()
    @ApiProperty({ description: 'The user\'s name', example: 'admin' })
    name: string ;

    @Prop({unique: [true, 'This email is already in use']})
    @ApiProperty({ description: 'The user\'s email address', example: 'admin@gmail.com' })
    email :string ;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country'})
    @ApiProperty({ description: 'The user\'s country id', example: '64f7645587d83c9140df3dd9' })
    country: mongoose.Types.ObjectId ;

    @Prop()
    @ApiProperty({ description: 'The user\'s password', example: 'admin12345' })
    password: string ;

}

export const UserSchema = SchemaFactory.createForClass(User);