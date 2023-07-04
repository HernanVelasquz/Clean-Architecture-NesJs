import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDataServices } from '../../../domain';
import { TransferData, UserData } from './data';
import { TypeOrmConfigService } from './service';
import { TypeOrmDataServices } from './typeorm-data-services.service';

/**
 * @module TypeormDataServicesModule
 * @description Módulo para la configuración y exportación de los servicios de datos utilizando TypeORM.
 * @exports TypeormDataServicesModule
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UserData, TransferData]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: TypeOrmDataServices,
    },
  ],
  exports: [IDataServices],
})
export class TypeormDataServicesModule {}
