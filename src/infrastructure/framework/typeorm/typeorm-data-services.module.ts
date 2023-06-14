import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDataServices } from 'src/domain';
import { UserData } from './data';
import { TypeOrmConfigService } from './service';
import { TypeOrmDataServices } from './typeorm-data-services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserData]),
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
