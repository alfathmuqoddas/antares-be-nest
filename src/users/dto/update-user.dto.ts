import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  name: string;

  @IsEmail()
  email: string;

  isAdmin: boolean;

  password: string;
}
