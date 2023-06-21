import { ApiProperty } from '@nestjs/swagger';
import { TransferEntity } from 'src/domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserData } from './user.data';

/**
 * @class TransferData
 * @classdesc Entidad que representa el historial de transferencias.
 * @extends TransferEntity
 * @property {string} id - Identificador único generado automáticamente.
 * @property {string} toEmail - Correo electrónico del destinatario de la transferencia.
 * @property {string} fromEmail - Correo electrónico del remitente de la transferencia.
 * @property {number} valueTransfer - Valor de la transferencia.
 * @property {Date} date - Fecha de la transferencia.
 * @property {UserData} user - Usuario asociado a la transferencia.
 * @exports TransferData
 */
@Entity({ name: 'TransferHistory' })
export class TransferData extends TransferEntity {
  /**
   * @member {string}
   * @description Identificador único generado automáticamente.
   */
  @ApiProperty({ description: 'Identificador único generado automáticamente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @member {string}
   * @description Correo electrónico del destinatario de la transferencia.
   */
  @ApiProperty({
    description: 'Correo electrónico del destinatario de la transferencia',
  })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  toEmail: string;

  /**
   * @member {string}
   * @description Correo electrónico del remitente de la transferencia.
   */
  @ApiProperty({
    description: 'Correo electrónico del remitente de la transferencia',
  })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  fromEmail: string;

  /**
   * @member {number}
   * @description Valor de la transferencia.
   */
  @ApiProperty({ description: 'Fecha de la transferencia' })
  @Column({ type: 'int', nullable: false })
  valueTransfer: number;

  /**
   * @member {Date}
   * @description Fecha de la transferencia.
   */
  @ApiProperty({ description: 'Fecha de la transferencia' })
  @Column({
    name: 'date',
    type: 'timestamp without time zone',
    default: 'now()',
  })
  date: Date;

  /**
   * @member {UserData}
   * @description Usuario asociado a la transferencia.
   */
  @ApiProperty({
    type: UserData,
    description: 'Usuario asociado a la transferencia',
  })
  @ManyToOne(() => UserData, (user) => user.transactions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  user: UserData;
}
