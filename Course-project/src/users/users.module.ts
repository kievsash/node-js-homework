import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokensService } from '../auth/services/tokens.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, TokensService],
  exports: [UsersService],
})
export class UsersModule {}
