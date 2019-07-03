import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Event } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return await createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find().exec();
  }

  async findAllForLastDay(): Promise<Event[]> {
    const today = moment().startOf('day');
    return await this.eventModel.find({
      created: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).exec();
  }
}
