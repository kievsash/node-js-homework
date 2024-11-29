import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { RedisModule } from './redis/redisClient.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, PostsModule, RedisModule],
})
export class AppModule {}
