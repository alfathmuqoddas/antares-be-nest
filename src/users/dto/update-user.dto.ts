import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  name: string;

  @IsEmail()
  email: string;

  roles: string;

  password: string;
}
