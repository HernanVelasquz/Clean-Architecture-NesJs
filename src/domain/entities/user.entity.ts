import { TransferEntity } from './transfer.entity';

export class UserEntity {
  id: string;
  fullName: string;
  typeDocument: string;
  numberDocument: string;
  email: string;
  password: string;
  deposit: number;
  transactions: Array<TransferEntity>;
}
