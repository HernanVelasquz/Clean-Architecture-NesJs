import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Identificador único generado automáticamente' })
  id: string;
  /**
   * @member {string} UserEntity#fullName
   * @description Nombre completo del usuario.
   */
  @ApiProperty({ description: 'Nombre completo del usuario' })
  fullName: string;
  /**
   * @member {string} UserEntity#typeDocument
   * @description Tipo de documento del usuario.
   */
  @ApiProperty({ description: 'Tipo de documento del usuario' })
  typeDocument: string;
  /**
   * @member {string} UserEntity#numberDocument
   * @description Número de documento del usuario.
   */
  @ApiProperty({ description: 'Número de documento del usuario' })
  numberDocument: string;
  /**
   * @member {string} UserEntity#email
   * @description Correo electrónico del usuario.
   */
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  email: string;
  /**
   * @member {string} UserEntity#password
   * @description Contraseña del usuario.
   */
  @ApiProperty({ description: 'Contraseña del usuario' })
  password: string;
  /**
   * @member {number} UserEntity#deposit
   * @description Monto depositado por el usuario.
   */
  @ApiProperty({ description: 'Saldo en la cuenta del usuario' })
  deposit: number;
  /**
   * @member {Array<TransferEntity>} UserEntity#transactions
   * @description Lista de transferencias realizadas por el usuario.
   */
  @ApiProperty({
    type: () => [TransferEntity],
    description: 'Array de transferencias asociadas al usuario',
  })
  transactions: Array<TransferEntity>;
}
