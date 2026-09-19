import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from '@/profile/profile.controller';
import { Profile } from '@/profile/profile.entity';
import { ProfileService } from '@/profile/profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([Profile])],
})
export class ProfileModule {}
