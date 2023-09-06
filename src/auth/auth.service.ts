import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    // SignUp
    async signUp(signUpDto: SignUpDto): Promise<{ message: string, token: string }> {
        const { name, email, country, password } = signUpDto;

        const duplicateEmailRes = await this.userModel.findOne({ email });

        if (duplicateEmailRes) {
            throw new UnauthorizedException('This email is already in use.');
        } else {


            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.userModel.create({
                name,
                email,
                country,
                password: hashedPassword
            });

            const token = this.jwtService.sign({ id: user._id });

            return { message: 'Signup success.', token };
        }
    }

    // Login
    async login(loginDto: LoginDto): Promise<{ message: string, token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password.');
        } else {

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                throw new UnauthorizedException('Invalid email or password.');
            } else {

                const token = this.jwtService.sign({ id: user._id });

                return { message: 'Login success.', token };
            }
        }
    }


    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel
            .find()
            .populate('country', 'name')
            .select('-_id -password')
            .lean()
            .exec();

        // Remove 'country._id' from each user object
        const usersData= users.map((user) => {
            delete user.country._id;
            return user;
        });

        return usersData;
    }




}
