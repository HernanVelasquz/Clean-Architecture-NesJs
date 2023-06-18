import { TransferEntity } from 'src/domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserData } from './user.data';

@Entity({ name: 'TransferHistory' })
export class TransferData extends TransferEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  toEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  fromEmail: string;

  @Column({ type: 'int', nullable: false })
  valueTransfer: number;

  @Column({
    name: 'date',
    type: 'timestamp without time zone',
    default: 'now()',
  })
  date: Date;

  @ManyToOne(() => UserData, (user) => user.transactions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  user: UserData;
}
