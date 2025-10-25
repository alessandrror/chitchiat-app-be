import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async registerLocal(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string }> {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.userService.create({
      email: registerDto.email,
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      nickName: registerDto.nickName,
      birthDate: registerDto.birthDate,
      gender: registerDto.gender,
      country: registerDto.country,
      avatar: registerDto.avatar,
      phoneNumber: registerDto.phoneNumber,
      isEmailConfirmed: registerDto.isEmailConfirmed,
      isPhoneNumberConfirmed: registerDto.isPhoneNumberConfirmed,
      isActive: registerDto.isActive || true,
      createdAt: registerDto.createdAt || new Date().toISOString(),
      updatedAt: registerDto.updatedAt || new Date().toISOString(),
    });
    const accessToken = this.generateJwtToken(newUser);
    return { accessToken };
  }

  async loginLocal(user: User): Promise<{ accessToken: string }> {
    const accessToken = this.generateJwtToken(user);
    return { accessToken };
  }

  async googleLogin(googleUserData: {
    googleId: string;
    email: string;
    name: string;
    avatar: string;
    accessToken: string;
  }): Promise<{ accessToken: string }> {
    let user = await this.userService.findByGoogleId(googleUserData.googleId);

    if (!user) {
      // If user doesn't exist by googleId, check by email
      user = await this.userService.findByEmail(googleUserData.email);
      if (user) {
        // If user exists with email but no googleId, link googleId
        user = await this.userService.update(user.id, {
          googleId: googleUserData.googleId,
          avatar: googleUserData.avatar,
        });
      } else {
        // Create a new user
        user = await this.userService.create({
          googleId: googleUserData.googleId,
          password: '',
          email: googleUserData.email,
          firstName: googleUserData.name.split(' ')[0],
          lastName: googleUserData.name.split(' ')[1],
          avatar: googleUserData.avatar,
          isEmailConfirmed: true, // Google verifies email for us
        });
      }
    }

    const accessToken = this.generateJwtToken(user);
    return { accessToken };
  }

  private generateJwtToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
