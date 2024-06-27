import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  PreconditionFailedException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from '../users/schemas/dto/create-users.dto';
import { LoginUserDto } from '../users/schemas/dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  users: any;
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  async updateUser(
    @Body() createUserDto: CreateUserDto,
    @Param('id') id: string,
  ) {
    return await this.userService.updateUser(id, createUserDto);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post('/login')
  @HttpCode(200)
  async userLogin(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto);
    if (!user) {
      throw new NotFoundException(
        `User not exist, email id : ${loginUserDto.email}`,
      );
    }
    if (user.status != 'ACTIVE') {
      throw new PreconditionFailedException(
        `User Inactive with email id : ${loginUserDto.email}`,
      );
    }
    return this.authService.generateToken(user);
  }
}
