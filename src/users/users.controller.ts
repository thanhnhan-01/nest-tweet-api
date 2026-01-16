import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

// http://localhost:3000/users

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  // @Get(":id")
  // getUserById(@Param("id", ParseIntPipe) id: number) {
  //     return this.usersService.getUserById(id);
  // }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  // @Patch()
  // updateUser(@Body() user: UpdateUserDto) {
  //     console.log(user);
  //     return "Updated Successfully!"
  // }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
