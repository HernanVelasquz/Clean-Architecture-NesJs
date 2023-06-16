import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/infrastructure';
import { UserUseCaseModule } from '../user';
import { TransferFactoryService } from './factories/transfer-factory.service';
import { GetHistoryTransferUseCase } from './use-cases';
import { RegisterTransferUseCase } from './use-cases/register-transfer.use-case';

@Module({
  imports: [DataServicesModule, UserUseCaseModule],
  providers: [
    TransferFactoryService,
    RegisterTransferUseCase,
    GetHistoryTransferUseCase,
  ],
  exports: [
    TransferFactoryService,
    RegisterTransferUseCase,
    GetHistoryTransferUseCase,
  ],
})
export class TransferUseCaseModule {}
