import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { TransferEntity } from 'src/domain';
import { DependencyTransferAbstract } from './abstracts';

@Injectable()
export class GetHistoryTransferUseCase extends DependencyTransferAbstract {
  public historyTransferUseCase(
    emailFrom: string,
  ): Observable<TransferEntity | null | TransferEntity[]> {
    return from(this.dataServices.transefer.getEmail(emailFrom)).pipe(
      map((historyTransfer) => {
        console.log(historyTransfer);
        return historyTransfer;
      }),
    );
  }
}
