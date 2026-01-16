import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { CreateTweetDto } from 'src/tweet/dto/create-tweet.dto';
import { TweetService } from 'src/tweet/tweet.service';

// http://localhost:3000/tweet

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  // http://localhost:3000/tweet/10
  @Get(':userid')
  public getTweets(@Param('userid', ParseIntPipe) userid: number) {
    return this.tweetService.getTweets(userid);
  }

  @Post()
  public createTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.createTweet(tweet);
  }
}
