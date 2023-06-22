import { UserEntity } from 'src/domain';
import { IsNotEmpty, IsEmail, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

/**
 * @class RechargeAccountDto
 * @classdesc DTO (Data Transfer Object) para la recarga de cuenta de usuario.
 * @extends UserEntity
 */
@InputType()
export class RechargeAccountDto extends UserEntity {
  /**
   * Dirección de correo electrónico del usuario.
   * @type {string}
   * @memberof RechargeAccountDto
   */
  @ApiProperty()
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Monto de la recarga en la cuenta del usuario.
   * @type {number}
   * @memberof RechargeAccountDto
   */
  @ApiProperty()
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsPositive()
  deposit: number;
}
