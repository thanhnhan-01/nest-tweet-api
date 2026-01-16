import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Profile } from 'src/profile/profile.entity';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) { }

  public async getAllUsers() {
    return await this.userRepository.find({
      relations: { profile: true },
    });
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      // Create a Profile & Save
      userDto.profile = userDto.profile ?? {};

      // Create User
      const user = this.userRepository.create({
        username: userDto.username,
        email: userDto.email,
        password: userDto.password,
        profile: userDto.profile,
      });

      // Save the user object
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email or username already exists!');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteUser(id: number) {
    try {
      // Delete user
      await this.userRepository.delete(id);

      return { delete: true };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
