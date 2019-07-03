import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import { Event } from './interfaces/event.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createEventDto: CreateEventDto) {
    await this.eventService.create(createEventDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get('lastday')
  @UseGuards(AuthGuard())
  async findAllForLastDay(): Promise<Event[]> {
    return this.eventService.findAllForLastDay();
  }
}
