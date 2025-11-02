import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AddUserDto } from "./dto/add-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Post()
  add(@Body() addUserDto: AddUserDto) {
    return this.usersService.add(addUserDto);
  }
}