import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/infrastructure';
import { UserUseCaseModule } from '../user';
import { TransferFactoryService } from './factories/transfer-factory.service';
import { GetHistoryTransferUseCase } from './use-cases';
import { RegisterTransferUseCase } from './use-cases/register-transfer.use-case';

/**
 * @class TransferUseCaseModule
 * @classdesc Módulo que encapsula los casos de uso relacionados con las transferencias.
 * @exports TransferUseCaseModule
 * @imports DataServicesModule - Módulo de servicios de datos utilizado por las transferencias.
 * @imports UserUseCaseModule - Módulo de casos de uso de usuarios utilizado por las transferencias.
 * @providers
 *   TransferFactoryService - Servicio de fábrica de transferencias.
 *   RegisterTransferUseCase - Caso de uso para registrar una transferencia.
 *   GetHistoryTransferUseCase - Caso de uso para obtener el historial de transferencias.
 * @exports
 *   TransferFactoryService - Servicio de fábrica de transferencias.
 *   RegisterTransferUseCase - Caso de uso para registrar una transferencia.
 *   GetHistoryTransferUseCase - Caso de uso para obtener el historial de transferencias.
 */
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
