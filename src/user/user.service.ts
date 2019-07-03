import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Event } from '../event/interfaces/event.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto);
      const res = await user.save();
      await this.createUserEvent(createUserDto.email, 'REGISTER');
      return res;
    } catch (err) {
      if (err && err.code === 11000) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'User with this email already exists',
        }, 403);
      } else {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: err,
        }, 500);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneByEmail(email): Promise<User> {
    return await this.userModel.find({ email }).exec();
  }

  async createUserEvent(email, type) {
    const user = await this.userModel.find({ email }).exec();
    const event = new this.eventModel({
      type,
      user,
    });
    user.events.push(event);
    user.save();
    event.save();
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
