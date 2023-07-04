import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { from, Observable } from 'rxjs';

import {
  GetHistoryTransferUseCase,
  RegisterTransferUseCase,
} from '../../../application';
import { TransferDtoInput, TransferOutputDto } from './dto';

/**
 * Resolver de transferencias.
 *
 * @resolver Transfer
 */
@Resolver()
export class TransferResolver {
  /**
   * Constructor de la clase TransferResolver.
   *
   * @param {RegisterTransferUseCase} registerTransferUseCase - Caso de uso para registrar transferencias.
   * @param {GetHistoryTransferUseCase} getHistoryTransferUseCase - Caso de uso para obtener el historial de transferencias.
   */
  constructor(
    private readonly registerTransferUseCase: RegisterTransferUseCase,
    private readonly getHistoryTransferUseCase: GetHistoryTransferUseCase,
  ) {}

  /**
   * Registra una transferencia.
   *
   * @mutation
   * @returns {Observable<TransferOutputDto>} - La información de la transferencia registrada.
   * @param {TransferDtoInput} createTransferDto - Datos de la transferencia a registrar.
   */
  @Mutation(() => TransferOutputDto)
  registerTransfer(
    @Args('createTransferDto') createTransferDto: TransferDtoInput,
  ): Observable<TransferOutputDto> {
    return from(
      this.registerTransferUseCase.registerTransfer(createTransferDto),
    );
  }

  /**
   * Obtiene el historial de transferencias de un cliente.
   *
   * @query
   * @returns {Observable<TransferOutputDto[]>} - El historial de transferencias del cliente.
   * @param {string} client_id - ID del cliente para obtener su historial de transferencias.
   */
  @Query(() => [TransferOutputDto])
  getHistoryTransfer(
    @Args('client_id') client_id: string,
  ): Observable<TransferOutputDto[]> {
    return from(
      this.getHistoryTransferUseCase.historyTransferUseCase(client_id),
    );
  }
}
