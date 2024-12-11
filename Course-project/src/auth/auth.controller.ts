import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ schema: { type: 'object', properties: { username: { type: 'string', description: 'The username of the user' }, password: { type: 'string', description: 'The password of the user' } }, required: ['username', 'password'] } })
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return this.authService.login(user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ schema: { type: 'object', properties: { refresh_token: { type: 'string', description: 'The refresh token used to obtain a new access token' } }, required: ['refresh_token'] } })
  async refresh(@Body() body: { refresh_token: string }) {
    const token = await this.authService.refreshAccessToken(body.refresh_token);

    if (!token) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return token;
  }
}
