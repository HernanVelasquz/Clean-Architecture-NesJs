import { UserEntity } from 'src/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class UserData extends UserEntity {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

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

  // @Column({ type: 'int', nullable: false, default: 1000 })
  @Column({ type: 'int', nullable: false })
  deposit: number;
}
