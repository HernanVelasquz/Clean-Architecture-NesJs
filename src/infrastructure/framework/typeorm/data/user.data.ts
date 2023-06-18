import { UserEntity } from 'src/domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransferData } from './transfer.data';

@Entity({ name: 'Users' })
export class UserData extends UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'client_id' })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  fullName: string;

  @Column({ type: 'char', length: 5, nullable: false })
  typeDocument: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  numberDocument: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  password: string;

  @Column({ type: 'int', nullable: false })
  deposit: number;

  @OneToMany(() => TransferData, (transfers) => transfers.user, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  transactions: Array<TransferData>;
}
