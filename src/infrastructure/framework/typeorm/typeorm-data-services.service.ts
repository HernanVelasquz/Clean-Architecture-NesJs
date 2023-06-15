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

export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  user: IGenericRepository<UserEntity>;
  transefer: IGenericRepository<TransferEntity>;

  constructor(
    @InjectRepository(UserData) private UserRepository: Repository<UserData>,
    @InjectRepository(TransferData)
    private TransferRepository: Repository<TransferData>,
  ) {}

  onApplicationBootstrap() {
    this.user = new TypeOrmGenericRepository<UserEntity>(this.UserRepository);
    this.transefer = new TypeOrmGenericRepository<TransferData>(
      this.TransferRepository,
    );
  }
}
