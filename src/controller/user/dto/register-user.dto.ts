import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { UserEntity } from 'src/domain';

export class RegisterUserDto extends UserEntity {
  @IsString({ message: 'Full Name Is Required' })
  @IsNotEmpty()
  @Length(6, 100)
  fullName: string;

  @IsString({ message: 'Type document is Required' })
  @IsNotEmpty()
  @MaxLength(5)
  typeDocument: string;

  @IsString({ message: 'Document is Required' })
  @IsNotEmpty()
  numberDocument: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15, {
    message: 'Please enter a password betwen 8 and 10 characters',
  })
  password: string;
}
