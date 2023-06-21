import { BadRequestException } from '@nestjs/common';

/**
 * @class InsufficientFundsException
 * @classdesc Excepción personalizada para indicar un error de fondos insuficientes en la cuenta.
 * @extends BadRequestException
 */
export class InsufficientFundsException extends BadRequestException {
  /**
   * @constructor
   */
  constructor() {
    super('Fondos insuficientes en la cuenta');
  }
}
