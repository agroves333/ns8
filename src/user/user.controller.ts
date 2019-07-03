import { Controller, UseGuards, Get, Post, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id/events')
  @UseGuards(AuthGuard())
  async findAllEventsForUser(@Param() params): Promise<User[]> {
    return this.userService.findAllEventsForUser(params.id);
  }
}
