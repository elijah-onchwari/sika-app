import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  nationalId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
