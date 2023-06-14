import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IDataServices, IGenericRepository, UserEntity } from 'src/domain';
import { UserData } from './data';
import { TypeOrmGenericRepository } from './typeorm-generic-repository';

export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  user: IGenericRepository<UserEntity>;

  constructor(
    @InjectRepository(UserData) private UserRepository: Repository<UserData>,
  ) {}

  onApplicationBootstrap() {
    this.user = new TypeOrmGenericRepository<UserEntity>(this.UserRepository);
  }
}
