import { Controller, Get, Param, Post, Body, UseGuards, Delete, Request, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Create new user',
  })
  @ApiBody({ schema: { type: 'object', properties: { username: { type: 'string', description: 'The username of the new user' }, password: { type: 'string', description: 'The password for the new user' } }, required: ['username', 'password'] }})
  async create(@Body() body: { username: string; password: string }) {
    await this.usersService.createUser(body.username, body.password);
    return { message: 'User created successfully' };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete current user' })
  @ApiBody({ schema: { type: 'object', properties: { username: { type: 'string', description: 'The username of the current user' } }, required: ['username'] } })
  async delete(@Request() req: any) {
    await this.usersService.deleteUser(req.user.username);
    return { message: 'User deleted successfully' };
  }
}
