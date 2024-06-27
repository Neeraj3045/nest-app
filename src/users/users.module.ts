import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CacheModule.register({
      store: redisStore as unknown as string, // Cast to string to satisfy the type checker
      host: '127.0.0.1',
      port: 6379,
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
