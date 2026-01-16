import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TweetController } from 'src/tweet/tweet.controller';
import { Tweet } from 'src/tweet/tweet.entity';
import { TweetService } from 'src/tweet/tweet.service';

import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [UsersModule, TypeOrmModule.forFeature([Tweet])],
})
export class TweetModule { }