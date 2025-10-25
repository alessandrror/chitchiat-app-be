import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'The password of the user' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234567890', description: 'The google id of the user' })
  googleId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'John Doe',
    description: 'The nick name of the user',
  })
  nickName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '1990-01-01',
    description: 'The birth date of the user',
  })
  birthDate: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Male', description: 'The gender of the user' })
  gender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'United States',
    description: 'The country of the user',
  })
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'The avatar of the user',
  })
  avatar: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
  })
  phoneNumber: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    description: 'The is email confirmed of the user',
  })
  isEmailConfirmed: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    description: 'The is phone number confirmed of the user',
  })
  isPhoneNumberConfirmed: boolean;
}
