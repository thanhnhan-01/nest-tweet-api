import { Controller, Get } from '@nestjs/common';

import { ProfileService } from 'src/profile/profile.service';

// http://localhost:3000/profile

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  public getProfile() {
    return this.profileService.getAllProfiles();
  }
}
