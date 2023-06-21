import { UserEntity } from './user.entity';

/**
 * @class TransferEntity
 * @classdesc Representa una transferencia en el sistema.
 */
export class TransferEntity {
  /**
   * @member {string} TransferEntity#id
   * @description Identificador de la transferencia (opcional).
   */
  id?: string;
  /**
   * @member {string} TransferEntity#toEmail
   * @description Correo electrónico del destinatario de la transferencia.
   */
  toEmail: string;
  /**
   * @member {string} TransferEntity#fromEmail
   * @description Correo electrónico del remitente de la transferencia.
   */
  fromEmail: string;
  /**
   * @member {number} TransferEntity#valueTransfer
   * @description Valor de la transferencia.
   */
  valueTransfer: number;
  /**
   * @member {Date} TransferEntity#date
   * @description Fecha de la transferencia (opcional).
   */
  date?: Date;
  /**
   * @member {UserEntity} TransferEntity#user
   * @description Usuario asociado a la transferencia (opcional).
   */
  user?: UserEntity;
}
