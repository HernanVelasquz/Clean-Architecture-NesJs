import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { UserEntity } from 'src/domain';

/**
 * @class RegisterUserDto
 * @classdesc DTO (Data Transfer Object) para el registro de usuario.
 * @extends UserEntity
 */
@InputType()
export class RegisterUserDto extends UserEntity {
  /**
   * Nombre completo del usuario.
   * @type {string}
   * @memberof RegisterUserDto
   */
  @ApiProperty()
  @Field(() => String)
  @IsString({ message: 'Full Name Is Required' })
  @IsNotEmpty()
  @Length(6, 100)
  fullName: string;

  /**
   * Tipo de documento del usuario.
   * @type {string}
   * @memberof RegisterUserDto
   */
  @ApiProperty()
  @Field(() => String)
  @IsString({ message: 'Type document is Required' })
  @IsNotEmpty()
  @MaxLength(5)
  typeDocument: string;

  /**
   * Número de documento del usuario.
   * @type {string}
   * @memberof RegisterUserDto
   */
  @ApiProperty()
  @Field(() => String)
  @IsString({ message: 'Document is Required' })
  @IsNotEmpty()
  numberDocument: string;

  /**
   * Dirección de correo electrónico del usuario.
   * @type {string}
   * @memberof RegisterUserDto
   */
  @ApiProperty()
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario.
   * @type {string}
   * @memberof RegisterUserDto
   */
  @ApiProperty()
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(8, 15, {
    message: 'Please enter a password betwen 8 and 10 characters',
  })
  password: string;
}
