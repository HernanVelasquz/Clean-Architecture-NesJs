import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../../../domain';
import { TransferFactoryService } from '../../factories';

/**
 * @class DependencyTransferAbstract
 * @classdesc Clase abstracta que representa la dependencia para las funcionalidades de transferencia.
 */
@Injectable()
export abstract class DependencyTransferAbstract {
  /**
   * @constructor
   * @param {IDataServices} dataServices - Servicios de datos utilizados para la transferencia.
   * @param {TransferFactoryService} transferFactoryService - Servicio de fábrica de transferencias.
   */
  constructor(
    protected readonly dataServices: IDataServices,
    protected readonly transferFactoryService: TransferFactoryService,
  ) {}
}
