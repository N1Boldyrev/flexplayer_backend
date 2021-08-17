import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await hash(createUserDto.password, Number.parseInt(process.env.BCRYPT_HASH));
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getByLogin(login: string): Promise<User> {
    return this.userModel.findOne({ login: login });
  }

  async getByToken(auth_token: string): Promise<User> {
    return this.userModel.findOne({ auth_token: auth_token });
  }

  async setTokens(login: string, access_token: string, refresh_token: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { login: login },
      { access_token: access_token, refresh_token: refresh_token }
    );
  }
}
