import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';
import { AuthModule } from '../src/auth/auth.module';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            login: jest.fn().mockResolvedValue({ accessToken: 'testToken' }),
          },
        },
      ],
      imports: [AuthModule], // Import the AuthModule here
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('login', () => {
    // it('should return an access token', async () => {
    //   const loginDto = { email: 'test', password: 'test' };
    //   const result = await userController.userLogin(loginDto);
    //   expect(result).toEqual({ accessToken: 'testToken' });
    //   expect(userController.userLogin).toHaveBeenCalledWith(loginDto);
    // });

    it('should handle invalid login', async () => {
      jest
        .spyOn(userService, 'getUserByEmail')
        .mockRejectedValueOnce(new Error('Invalid credentials'));
      const loginDto = { email: 'wrong', password: 'wrong' };

      try {
        await userController.userLogin(loginDto);
      } catch (error) {
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });
});
