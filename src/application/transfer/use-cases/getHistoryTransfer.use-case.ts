import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { TransferEntity } from 'src/domain';
import { DependencyTransferAbstract } from './abstracts';

/**
 * @class GetHistoryTransferUseCase
 * @classdesc Clase que representa el caso de uso para obtener el historial de transferencias de un usuario.
 * @extends DependencyTransferAbstract
 */
@Injectable()
export class GetHistoryTransferUseCase extends DependencyTransferAbstract {
  /**
   * @method GetHistoryTransferUseCase#historyTransferUseCase
   * @description Obtiene el historial de transferencias de un usuario.
   * @param {string} idUser - ID del usuario para el cual se desea obtener el historial de transferencias.
   * @returns {Observable<TransferEntity[]>} Observable que emite un arreglo de entidades de transferencia correspondientes al historial del usuario.
   */
  public historyTransferUseCase(idUser: string): Observable<TransferEntity[]> {
    return from(this.dataServices.transefer.getAll()).pipe(
      map((historyTransfer) => {
        return historyTransfer.filter((history) => history.user?.id === idUser);
      }),
    );
  }
}
