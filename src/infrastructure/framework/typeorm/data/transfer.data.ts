import { TransferEntity } from 'src/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TransferHistory' })
export class TransferData extends TransferEntity {
  @PrimaryGeneratedColumn('uuid')
  idTransfer: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  toEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  fromEmail: string;

  @Column({ type: 'int', nullable: false })
  valueTransfer: number;
}
