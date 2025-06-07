import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { LoginRequest, LoginResponse } from './dtos/login.dto';
import { RegisterRequest, RegisterResponse } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Failed! This account not found.');
    }

    if (!bcrypt.compareSync(payload.password, user.password)) {
      throw new BadRequestException('Failed! Wrong email or password.');
    }

    const paylodToken = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(paylodToken, {
      expiresIn: '30d',
    });

    return {
      result: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        telepon: user.telepon,
        accessToken: accessToken,
      },
      statusCode: 200,
      message: 'Success! Sign-in successfully.',
      error: false,
    };
  }

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const isUserExists = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (isUserExists) {
      throw new BadRequestException('Failed! User already exists.');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    await this.userRepository.insert({
      email: payload.email,
      nama: payload.nama,
      alamat: payload.nama,
      tipeUser: 'User',
      username: payload.username,
      telepon: payload.telepon,
      password: hashedPassword,
    });

    return {
      result: {
        email: payload.email,
        nama: payload.nama,
        alamat: payload.nama,
        username: payload.username,
        telepon: payload.telepon,
      },
      statusCode: 200,
      message: 'Success! Register successfully',
      error: false,
    };
  }
}
