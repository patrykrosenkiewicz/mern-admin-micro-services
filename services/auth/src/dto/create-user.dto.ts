export class CreateUserDto {
  readonly removed: boolean;
  readonly enabled: boolean;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly photo: string;
  readonly isLoggedIn: boolean;
}
