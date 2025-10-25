import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleOAuthStrategy } from './strategies/google-oauth.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule, // Import ConfigModule to use ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<number>('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleOAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
