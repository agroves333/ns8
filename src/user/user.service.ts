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

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = new this.userModel(createUserDto);
      await user.save();
      await this.createUserEvent(createUserDto.email, 'REGISTER');
      return {
        success: true,
        id: user.id,
        email: user.email,
      };
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

  async findAllEventsForUser(id): Promise<any> {
    return await this.userModel.findById(id, 'events')
      .populate('events')
      .lean()
      .exec();
  }

  async findOneByEmail(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async createUserEvent(email, type) {
    const user = await this.userModel.findOne({ email }).exec();
    const event = new this.eventModel({
      type,
      user,
    });
    user.events.push(event);
    user.save();
    event.save();
  }
}
