import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/infrastructure';
import { UserUseCaseModule } from '../user';
import { TransferFactoryService } from './factories/transfer-factory.service';
import { RegisterTransferUseCase } from './use-cases/register-transfer.use-case';

@Module({
  imports: [DataServicesModule, UserUseCaseModule],
  providers: [TransferFactoryService, RegisterTransferUseCase],
  exports: [TransferFactoryService, RegisterTransferUseCase],
})
export class TransferUseCaseModule {}
