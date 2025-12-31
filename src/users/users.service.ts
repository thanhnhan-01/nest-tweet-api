import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/profile/profile.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>
    ) { }

    getAllUsers() {
        return this.userRepository.find();
    }

    public async createUser(userDto: CreateUserDto) {
        try {
            // Create a Profile & Save
            userDto.profile = userDto.profile ?? {};

            // Create User Object
            // let user = this.userRepository.create(userDto);

            // Save the user object
            // return await this.userRepository.save(user);

            const user = this.userRepository.create({
                username: userDto.username,
                email: userDto.email,
                password: userDto.password,
                profile: userDto.profile,
            });

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
            // Find the user with given ID
            const user = await this.userRepository.findOne({
                where: { id },
                relations: ['profile'],
            });
    
            if (!user) {
                throw new NotFoundException('User not found');
            }
    
            // Delete user
            await this.userRepository.delete(id);
    
            // Delete profile if exists 
            if (user.profile) {
                await this.profileRepository.delete(user.profile.id);
            }
    
            return { delete: true }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

}