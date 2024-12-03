import { Controller, Get, Param, Post, Body, UseGuards, Delete, Request, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BodyParametersGuard } from '../guards/body-parameters-guard.service';
import { JwtAuthGuard } from '../auth/guards/oauth2.guard';

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

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete current user' })
  async delete(@Request() req: any) {
    await this.usersService.deleteUser(req.user.username);
    return { message: 'User deleted successfully' };
  }
}
