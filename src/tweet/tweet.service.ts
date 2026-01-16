import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTweetDto } from 'src/tweet/dto/create-tweet.dto';
import { Tweet } from 'src/tweet/tweet.entity';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet) private readonly tweetRepository: Repository<Tweet>,
  ) { }

  public async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: { user: true }
    });
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    try {
      // Find user by userId
      const user = await this.userService.findUserById(createTweetDto.userId);

      // Throw an error if the user does not exist
      if (!user) {
        throw new Error('User not found');
      }

      // Create a tweet
      const tweet = this.tweetRepository.create({
        text: createTweetDto.text,
        image: createTweetDto.image,
        user,
      });

      // Save the tweet
      return await this.tweetRepository.save(tweet);
    } catch (error) {
      // Re-throw known HTTP exceptions
      if (error instanceof NotFoundException) {
        throw error;
      }

      // Handle unexpected errors
      throw new InternalServerErrorException('Failed to create tweet');
    }
  }
}
