import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/schemas/user.schema';
import { CreateUserDto } from '../src/users/schemas/dto/create-users.dto';

// Mock implementation of userModel
const mockUserModel = jest.fn((userDto) => ({
  ...userDto,
  save: jest.fn().mockResolvedValue({ ...userDto }),
}));

describe('UsersService', () => {
  let service: UsersService;
  let userModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should create a user', async () => {
    const userDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'demo@123!',
    };
    userModel.mockImplementationOnce(() => ({
      ...userDto,
      save: jest.fn().mockResolvedValue(userDto),
    }));
    const result = await service.createUser(userDto);
     // Remove the save method from the result before assertion
     const { save, ...resultWithoutSave } = result;
    //console.log(result);
    expect(resultWithoutSave).toBe(userDto);
    expect(userModel).toHaveBeenCalledWith(userDto);
  });
});
