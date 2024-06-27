import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './schemas/dto/create-users.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './schemas/dto/login-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUser(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    createdUser.save();
    return createdUser;
  }

  async updateUser(id: string, user: CreateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserByEmail(loginUserDto: LoginUserDto) {
    return await this.userModel.findOne({
      email: loginUserDto.email,
    });
  }
}
