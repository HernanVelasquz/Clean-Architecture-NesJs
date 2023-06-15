import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { DataServicesModule } from './infrastructure/data-service/data-service.module';
import { UserUseCaseModule } from './application/user/user-use-case.module';
import { UserController } from './controller/user/user.controller';
import { TransferUseCaseModule } from './application/transfer/transfer-use-case.module';
import { TransferController } from './controller/tranfer/transfer.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trim()}`,
      ),
    }),
    DataServicesModule,
    UserUseCaseModule,
    TransferUseCaseModule,
  ],
  controllers: [UserController, TransferController],
  providers: [],
})
export class AppModule {}
