import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: RegisterDto,
    description: 'Endpoint to create a new user',
    required: true,
  })
  create(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('google/:googleId')
  findByGoogleId(@Param('googleId') googleId: string) {
    return this.userService.findByGoogleId(googleId);
  }

  @Get('phone/:phoneNumber')
  findByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.userService.findByPhoneNumber(phoneNumber);
  }
}
