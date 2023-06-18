import { UserEntity } from './user.entity';

export class TransferEntity {
  id?: string;
  toEmail: string;
  fromEmail: string;
  valueTransfer: number;
  date?: Date;
  user?: UserEntity;
}
