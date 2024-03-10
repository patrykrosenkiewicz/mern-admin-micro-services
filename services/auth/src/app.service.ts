import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginBody, LoginResponse } from './types/login.type';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{
    name: string;
    email: string;
  }> {
    const saltOrRounds = 10;
    const mappedUser = {
      ...createUserDto,
      ...{ password: await bcrypt.hash(createUserDto.password, saltOrRounds) },
    };
    const createdUser = await new this.userModel(mappedUser).save();
    return { name: createdUser.name, email: createdUser.email };
  }
  async login(loginBody: LoginBody): Promise<LoginResponse> {
    const user = await this.userModel
      .findOne({ email: { $eq: loginBody.email } })
      .exec();

    if (!user) {
      this.logger.error(`Auth service: no user for ${loginBody.email}`);
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(loginBody.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const result = await this.userModel
      .findOneAndUpdate(
        { _id: user._id },
        { isLoggedIn: true },
        {
          new: true,
        },
      )
      .exec();

    const payload = { id: result._id };
    return {
      success: true,
      result: {
        token: await this.jwtService.signAsync(payload),
        admin: result,
      },
      message: 'Successfully login admin',
    };
  }

  logout(): string {
    return 'Logout!';
  }
}
