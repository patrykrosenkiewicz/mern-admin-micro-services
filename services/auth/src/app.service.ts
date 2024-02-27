import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginBody } from './types/login-body.type';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const mappedUser = {
      ...createUserDto,
      ...{ password: await bcrypt.hash(createUserDto.password, saltOrRounds) },
    };
    const createdUser = new this.userModel(mappedUser);
    return createdUser.save();
  }
  async login(loginBody: LoginBody): Promise<{ access_token: string }> {
    const user = await this.userModel
      .findOne({ name: { $eq: loginBody.name } })
      .exec();

    const isMatch = await bcrypt.compare(loginBody.password, user.password);
    if (!isMatch) {
      throw new Error('User data missmatch');
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  logout(): string {
    return 'Logout!';
  }
}
