import { TransferEntity, UserEntity } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

/**
 * @class IDataServices
 * @classdesc Representa los servicios de datos del sistema.
 */
export abstract class IDataServices {
  /**
   * @member {IGenericRepository<UserEntity>} IDataServices#user
   * @description Repositorio genérico para la entidad de usuario.
   */
  abstract user: IGenericRepository<UserEntity>;
  /**
   * @member {IGenericRepository<TransferEntity>} IDataServices#transefer
   * @description Repositorio genérico para la entidad de transferencia.
   */
  abstract transefer: IGenericRepository<TransferEntity>;
}
