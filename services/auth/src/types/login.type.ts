import { CreateUserDto } from '../dto/create-user.dto';

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  result: {
    token: string;
    admin: CreateUserDto & { isLoggedIn: boolean };
  };
  message: string;
};
