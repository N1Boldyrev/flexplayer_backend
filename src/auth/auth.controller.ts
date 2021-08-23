import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenResponse } from './types/token-response.type';
import { PublicRoute } from '../public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Get()
  async auth(
    @Query('login') login: string,
    @Query('password') password: string
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.auth(login, password);
  }

  @PublicRoute()
  @Post()
  refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    return this.authService.refresh(refreshTokenDto);
  }

  @Get('/check')
  checkToken(): boolean {
    return true;
  }
}
