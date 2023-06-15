import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { TransferEntity } from 'src/domain';
import { DependencyTransferAbstract } from './abstracts';

@Injectable()
export class GetHistoryTransferUseCase extends DependencyTransferAbstract {
  public historyTransferUseCase(
    email: string,
  ): Observable<TransferEntity | null | TransferEntity[]> {
    return from(this.dataServices.transefer.getEmail(email));
  }
}
