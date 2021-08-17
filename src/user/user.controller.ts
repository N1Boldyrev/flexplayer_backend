import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { MongoFilter } from '../utils/mongo-exeption.filter';
import { PublicRoute } from '../public-route.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @PublicRoute()
  @Post()
  @UseFilters(MongoFilter)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':login')
  async getByLogin(@Param('login') login: string): Promise<User> {
    return this.userService.getByLogin(login);
  }
}
