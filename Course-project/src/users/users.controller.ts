import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BodyParametersGuard } from '../guards/body-parameters-guard.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get all info about specific user' })
  async findOne(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Post()
  @UseGuards(new BodyParametersGuard(['username', 'password']))
  @ApiOperation({ summary: 'Create new user' })
  async create(@Body() body: { username: string; password: string }) {
    await this.usersService.createUser(body.username, body.password);
    return { message: 'User created successfully' };
  }
}
