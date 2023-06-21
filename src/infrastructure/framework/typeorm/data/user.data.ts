import { UserEntity } from 'src/domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransferData } from './transfer.data';

/**
 * @class UserData
 * @classdesc Entidad que representa los datos de un usuario.
 * @extends UserEntity
 * @property {string} id - Identificador único generado automáticamente.
 * @property {string} fullName - Nombre completo del usuario.
 * @property {string} typeDocument - Tipo de documento del usuario.
 * @property {string} numberDocument - Número de documento del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 * @property {number} deposit - Saldo en la cuenta del usuario.
 * @property {Array<TransferData>} transactions - Array de transferencias asociadas al usuario.
 * @exports UserData
 */
@Entity({ name: 'Users' })
export class UserData extends UserEntity {
  /**
   * @member {string}
   * @description Identificador único generado automáticamente.
   */
  @PrimaryGeneratedColumn('uuid', { name: 'client_id' })
  id: string;

  /**
   * @member {string}
   * @description Nombre completo del usuario.
   */
  @Column({ type: 'varchar', length: 255, nullable: false })
  fullName: string;

  /**
   * @member {string}
   * @description Tipo de documento del usuario.
   */
  @Column({ type: 'char', length: 5, nullable: false })
  typeDocument: string;

  /**
   * @member {string}
   * @description Número de documento del usuario.
   */
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  numberDocument: string;

  /**
   * @member {string}
   * @description Correo electrónico del usuario.
   */
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  /**
   * @member {string}
   * @description Contraseña del usuario.
   */
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  password: string;

  /**
   * @member {number}
   * @description Saldo en la cuenta del usuario.
   */
  @Column({ type: 'int', nullable: false })
  deposit: number;

  /**
   * @member {Array<TransferData>}
   * @description Array de transferencias asociadas al usuario.
   */
  @OneToMany(() => TransferData, (transfers) => transfers.user, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  transactions: Array<TransferData>;
}
