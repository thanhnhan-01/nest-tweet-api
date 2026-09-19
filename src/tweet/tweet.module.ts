import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TweetController } from '@/tweet/tweet.controller';
import { Tweet } from '@/tweet/tweet.entity';
import { TweetService } from '@/tweet/tweet.service';

import { UsersModule } from '@/users/users.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [UsersModule, TypeOrmModule.forFeature([Tweet])],
})
export class TweetModule {}
