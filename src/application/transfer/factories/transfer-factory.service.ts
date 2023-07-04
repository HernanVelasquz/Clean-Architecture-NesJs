import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../../../domain';

/**
 * @class TransferFactoryService
 * @classdesc Clase que representa el servicio de fábrica de transferencias.
 */
@Injectable()
export class TransferFactoryService {
  /**
   * @method TransferFactoryService#createNewTransfer
   * @description Crea un nuevo objeto de transferencia a partir de los datos proporcionados en createTransferDto.
   * @param {TransferEntity} createTransferDto - Datos de la transferencia para crear el nuevo objeto de transferencia.
   * @returns {TransferEntity} Nuevo objeto de transferencia creado.
   */
  createNewTransfer(createTransferDto: TransferEntity) {
    const newTransfer = new TransferEntity();
    newTransfer.toEmail = createTransferDto.toEmail;
    newTransfer.fromEmail = createTransferDto.fromEmail;
    newTransfer.valueTransfer = createTransferDto.valueTransfer;
    newTransfer.date = new Date();
    newTransfer.user = createTransferDto.user;
    return newTransfer;
  }
}
