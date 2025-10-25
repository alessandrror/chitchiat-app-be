import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: RegisterDto): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.usersRepository.update(id, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} could not be updated`);
    }

    return { ...user, ...updatedUser };
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { googleId } });
    return user ?? undefined;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { phoneNumber } });
    return user ?? undefined;
  }
}
