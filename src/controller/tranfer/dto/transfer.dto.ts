import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';
import { UserEntity } from 'src/domain';

/**
 * @class TransferDto
 * @classdesc DTO para transferencias de fondos entre usuarios.
 * @extends UserEntity
 */
export class TransferDto extends UserEntity {
  /**
   * Correo electrónico del destinatario de la transferencia.
   * @member {string}
   */
  @IsEmail()
  @IsNotEmpty()
  toEmail: string;

  /**
   * Correo electrónico del remitente de la transferencia.
   * @member {string}
   */
  @IsEmail()
  @IsNotEmpty()
  fromEmail: string;

  /**
   * Valor de la transferencia.
   * @member {number}
   */
  @IsPositive()
  @IsNotEmpty()
  valueTransfer: number;
}
