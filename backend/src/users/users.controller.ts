import { Body, Controller, Get, Param, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AddUserDto } from "./dto/add-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Post()
  add(@Body() addUserDto: AddUserDto) {
    return this.usersService.add(addUserDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateUserDto: AddUserDto) {
    console.log(updateUserDto)
    return this.usersService.updateOne(params, updateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return this.usersService.findOne({ id: req.user.id }, true);
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.usersService.findOne(params, true);
  }

}