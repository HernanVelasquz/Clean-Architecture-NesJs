import { TransferEntity } from './transfer.entity';
/**
 * @class UserEntity
 * @classdesc Representa a un usuario en el sistema.
 */
export class UserEntity {
  /**
   * @member {string} UserEntity#id
   * @description Identificador del usuario.
   */
  id: string;
  /**
   * @member {string} UserEntity#fullName
   * @description Nombre completo del usuario.
   */
  fullName: string;
  /**
   * @member {string} UserEntity#typeDocument
   * @description Tipo de documento del usuario.
   */
  typeDocument: string;
  /**
   * @member {string} UserEntity#numberDocument
   * @description Número de documento del usuario.
   */
  numberDocument: string;
  /**
   * @member {string} UserEntity#email
   * @description Correo electrónico del usuario.
   */
  email: string;
  /**
   * @member {number} UserEntity#deposit
   * @description Monto depositado por el usuario.
   */
  deposit: number;
  /**
   * @member {Array<TransferEntity>} UserEntity#transactions
   * @description Lista de transferencias realizadas por el usuario.
   */
  transactions: Array<TransferEntity>;
}
