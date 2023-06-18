import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { TransferEntity } from 'src/domain';
import { DependencyTransferAbstract } from './abstracts';

@Injectable()
export class GetHistoryTransferUseCase extends DependencyTransferAbstract {
  public historyTransferUseCase(idUser: string): Observable<TransferEntity[]> {
    return from(this.dataServices.transefer.getAll()).pipe(
      map((historyTransfer) => {
        return historyTransfer.filter((history) => history.user?.id === idUser);
      }),
    );
  }
}
