import { TransferEntity, UserEntity } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';
export abstract class IDataServices {
  abstract user: IGenericRepository<UserEntity>;
  abstract transefer: IGenericRepository<TransferEntity>;
}
