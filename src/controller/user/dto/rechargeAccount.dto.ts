import { UserEntity } from 'src/domain';
import { IsNotEmpty, IsEmail, IsPositive } from 'class-validator';

/**
 * @class RechargeAccountDto
 * @classdesc DTO (Data Transfer Object) para la recarga de cuenta de usuario.
 * @extends UserEntity
 */
export class RechargeAccountDto extends UserEntity {
  /**
   * Dirección de correo electrónico del usuario.
   * @type {string}
   * @memberof RechargeAccountDto
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Monto de la recarga en la cuenta del usuario.
   * @type {number}
   * @memberof RechargeAccountDto
   */
  @IsNotEmpty()
  @IsPositive()
  deposit: number;
}
