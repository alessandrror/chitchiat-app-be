import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test2@test.com',
    description: 'The email of the user',
  })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({ example: '123456', description: 'The password of the user' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'The google id of the user',
  })
  googleId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'The nick name of the user',
  })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '1990-01-01',
    description: 'The birth date of the user',
  })
  birthDate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Male', description: 'The gender of the user' })
  gender?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'El Salvador',
    description: 'The country of the user',
  })
  country?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png',
    description: 'The avatar of the user',
  })
  avatar?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in E.164 format (e.g., +1234567890)',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'The is email confirmed of the user',
  })
  isEmailConfirmed?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'The is phone number confirmed of the user',
  })
  isPhoneNumberConfirmed?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'The is active of the user',
  })
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The created at of the user',
  })
  createdAt?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The updated at of the user',
  })
  updatedAt?: string;
}
