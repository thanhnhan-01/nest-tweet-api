import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from 'src/profile/profile.controller';
import { Profile } from 'src/profile/profile.entity';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([Profile])],
})
export class ProfileModule {}
