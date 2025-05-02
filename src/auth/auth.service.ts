import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { appConfig } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(input: CreateUserInput) {
    const normalizedEmail = input.email.toLowerCase();
    const userExists = await this.userRepository.findOneBy({
      email: normalizedEmail,
    });

    if (userExists) {
      throw new ConflictException(
        'User account with email address already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = this.userRepository.create({
      ...input,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    if (!savedUser) {
      throw new BadRequestException('Failed to create user account');
    }

    delete savedUser.password;
    return { message: 'User account created successfully' };
  }

  async login(input: LoginUserInput) {
    const normalizedUsername = input.username.toLowerCase();
    const user = await this.userRepository.findOneBy({
      username: normalizedUsername,
    });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    delete user.password;

    const jwtPayload = { id: user.id, email: user.email };
    const accessToken = await jwt.sign(jwtPayload, appConfig.JWT_SECRET, {
      expiresIn: '1h',
    });

    const data = { accessToken };
    return { message: 'User login successful', data };
  }
}
