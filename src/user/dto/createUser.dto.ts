import { IsEmail, IsNotEmpty, IsString, IsDate, Length } from 'class-validator';
export class createUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsDate()
  date: string;

  @IsString()
  @Length(60, 130)
  bio: string;

  @IsString()
  @Length(7, 30)
  password: string;

  @IsString()
  image: string;
}
