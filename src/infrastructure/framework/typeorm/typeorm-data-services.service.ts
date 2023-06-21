import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  IDataServices,
  IGenericRepository,
  TransferEntity,
  UserEntity,
} from 'src/domain';
import { TransferData, UserData } from './data';
import { TypeOrmGenericRepository } from './typeorm-generic-repository';

/**
 * @class TypeOrmDataServices
 * @classdesc Implementación de los servicios de datos utilizando TypeORM.
 * @implements {IDataServices}
 * @implements {OnApplicationBootstrap}
 * @exports TypeOrmDataServices
 */
export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  /**
   * @member {IGenericRepository<UserEntity>} user - Repositorio genérico para entidades de usuario.
   */
  user: IGenericRepository<UserEntity>;
  /**
   * @member {IGenericRepository<TransferEntity>} transefer - Repositorio genérico para entidades de transferencia.
   */
  transfer: IGenericRepository<TransferEntity>;

  /**
   * @constructor
   * @param {Repository<UserData>} UserRepository - Repositorio de TypeORM para la entidad de usuario.
   * @param {Repository<TransferData>} TransferRepository - Repositorio de TypeORM para la entidad de transferencia.
   */
  constructor(
    @InjectRepository(UserData) private UserRepository: Repository<UserData>,
    @InjectRepository(TransferData)
    private TransferRepository: Repository<TransferData>,
  ) {}

  /**
   * @method onApplicationBootstrap
   * @description Método del ciclo de vida de NestJS que se ejecuta cuando la aplicación se inicia.
   * Establece los repositorios genéricos para entidades de usuario y transferencia.
   */
  onApplicationBootstrap() {
    this.user = new TypeOrmGenericRepository<UserEntity>(this.UserRepository);
    this.transfer = new TypeOrmGenericRepository<TransferData>(
      this.TransferRepository,
    );
  }
}
