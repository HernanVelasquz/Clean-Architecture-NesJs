import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';

import {
  GetHistoryTransferUseCase,
  RegisterTransferUseCase,
} from 'src/application';
import { TransferEntity } from 'src/domain';
import { TransferDto } from './dto';

/**
 * @class TransferController
 * @classdesc Controlador para las operaciones relacionadas con transferencias de fondos.
 * @param {RegisterTransferUseCase} registerTransferUseCase - Instancia de RegisterTransferUseCase para realizar el registro de transferencias.
 * @param {GetHistoryTransferUseCase} getHistoryTransferUseCase - Instancia de GetHistoryTransferUseCase para obtener el historial de transferencias.
 */
@ApiTags('Transfer')
@UseGuards(AuthGuard('jwt'))
@Controller('transfer')
export class TransferController {
  constructor(
    private readonly registerTransferUseCase: RegisterTransferUseCase,
    private readonly getHistoryTransferUseCase: GetHistoryTransferUseCase,
  ) {}

  /**
   * Registra una nueva transferencia de fondos.
   * @method registerTransfer
   * @param {TransferDto} createUserDto - DTO de transferencia que contiene la información de la transferencia.
   * @returns {Observable<TransferEntity>} Observable que emite la entidad de transferencia registrada.
   */
  @ApiResponse({
    status: 201,
    description: 'Transferencia registrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Fondos insuficientes en la cuenta',
  })
  @ApiResponse({
    status: 500,
    description:
      'Al usuario que quiere realizar la transferencia no tiene cuenta registrada',
  })
  @Post()
  registerTransfer(
    @Body() createUserDto: TransferDto,
  ): Observable<TransferEntity> {
    return from(this.registerTransferUseCase.registerTransfer(createUserDto));
  }

  /**
   * Obtiene el historial de transferencias de un cliente específico.
   * @method getHistoryTransfer
   * @param {string} client_id - ID del cliente para el cual se desea obtener el historial de transferencias.
   * @returns {Observable<TransferEntity[]>} Observable que emite un array de entidades de transferencia correspondientes al historial del cliente.
   */
  @ApiResponse({
    status: 200,
    description: 'Obtiene historial de transferencias por Id',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay transferencias con este id',
  })
  @Get(':client_id')
  getHistoryTransfer(
    @Param('client_id', new ParseUUIDPipe({ version: '4' })) client_id: string,
  ): Observable<TransferEntity[]> {
    return from(
      this.getHistoryTransferUseCase.historyTransferUseCase(client_id),
    );
  }
}
