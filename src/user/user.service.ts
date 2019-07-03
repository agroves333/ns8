import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneByEmail(email): Promise<User> {
    return await this.userModel.find({ email }).exec();
  }

  async isAuthenticated(email, password): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ email, password }).lean().exec();
      return user ? true : false;
    } catch (err) {
      return false;
    }
  }
}
