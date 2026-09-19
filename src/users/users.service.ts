import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryFailedError, Repository } from 'typeorm';

import { Profile } from '@/profile/profile.entity';

import { CreateUserDto } from '@/users/dtos/create-user.dto';
import { User } from '@/users/user.entity';

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
      if (
        error instanceof QueryFailedError &&
        'code' in error &&
        error.code === 'ER_DUP_ENTRY'
      ) {
        throw new ConflictException(
          'Email or username already exists!',
        );
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Internal server error');
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

      throw new InternalServerErrorException(
        'Failed to delete user',
      );
    }
  }

  public async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}