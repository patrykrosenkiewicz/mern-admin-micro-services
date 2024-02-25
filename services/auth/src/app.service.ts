import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  register(): Promise<User> {
    const createdUser = new this.userModel();
    return createdUser.save();
  }
  login(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  logout(): string {
    return 'Logout!';
  }
}
