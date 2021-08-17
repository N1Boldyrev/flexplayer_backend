import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from './types/token.enum';
import { Token as TokenT } from './types/token.type';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenResponse } from './types/token-response.type';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  generateToken(payload: TokenT, expiresIn: string): string {
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: expiresIn });
  }

  isExpired(time: number): boolean {
    return new Date().getTime() / 1000 > time;
  }

  async auth(login: string, password: string): Promise<TokenResponse> {
    const findUser = await this.userService.getByLogin(login);
    if (findUser) {
      if (await compare(password, findUser.password)) {
        const payload = { login: findUser.login, name: findUser.name };
        const access_token = this.generateToken({ ...payload, type: Token.ACCESS }, '1d');
        const refresh_token = this.generateToken({ ...payload, type: Token.REFRESH }, '7d');
        await this.userService.setTokens(login, access_token, refresh_token);
        return { access_token: access_token, refresh_token: refresh_token };
      } else throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    } else throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    const { refresh_token } = refreshTokenDto;
    const decode: any = this.jwtService.decode(refresh_token);
    const findUser = await this.userService.getByLogin(decode.login);
    if (findUser) {
      if (findUser.refresh_token === refresh_token) {
        if (!this.isExpired(decode.exp)) {
          const payload = { login: findUser.login, name: findUser.name };
          const access_token = this.generateToken({ ...payload, type: Token.ACCESS }, '1d');
          const refresh_token = this.generateToken({ ...payload, type: Token.REFRESH }, '7d');
          await this.userService.setTokens(findUser.login, access_token, refresh_token);
          return { access_token: access_token, refresh_token: refresh_token };
        } else throw new HttpException('Refresh token expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Wrong refresh token', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
