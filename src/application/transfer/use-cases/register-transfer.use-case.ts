import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { from, Observable, map, switchMap } from 'rxjs';

import { UserFactoryService } from 'src/application/user';
import { IDataServices, TransferEntity, UserEntity } from 'src/domain';
import { InsufficientFundsException } from 'src/infrastructure';
import { TransferFactoryService } from '../factories';
import { DependencyTransferAbstract } from './abstracts';

@Injectable()
export class RegisterTransferUseCase extends DependencyTransferAbstract {
  constructor(
    protected readonly dataServices: IDataServices,
    protected readonly transferFactoryService: TransferFactoryService,
    private readonly userFactoryService: UserFactoryService,
  ) {
    super(dataServices, transferFactoryService);
  }

  public registerTransfer(
    transferDto: TransferEntity,
  ): Observable<TransferEntity> {
    return from(this.validateUser(transferDto)).pipe(
      switchMap((users) => {
        const [fromUser, toUser] = users;
        if (
          fromUser.deposit < transferDto.valueTransfer ||
          transferDto.valueTransfer > fromUser.deposit
        ) {
          throw new InsufficientFundsException();
        }
        fromUser.deposit -= transferDto.valueTransfer;
        toUser.deposit += transferDto.valueTransfer;
        transferDto.user = fromUser;
        const fromFactory = this.userFactoryService.updateUser(fromUser);
        const toFactory = this.userFactoryService.updateUser(toUser);
        const transferFacoty =
          this.transferFactoryService.createNewTransfer(transferDto);
        this.dataServices.user.update(fromFactory.id, fromFactory);
        this.dataServices.user.update(toFactory.id, toFactory);
        return from(this.dataServices.transefer.create(transferFacoty));
      }),
    );
  }

  private validateUser(userDto: TransferEntity): Observable<UserEntity[]> {
    const { fromEmail, toEmail } = userDto;
    return from(this.dataServices.user.getAll()).pipe(
      map((users: UserEntity[]) => {
        const fromUser = users.find((users) => users.email === fromEmail);
        const toUser = users.find((users) => users.email === toEmail);
        if (!fromUser || !toUser) {
          throw new InternalServerErrorException(
            `Al usuario que quiere realizar la transferencia no tiene cuenta registrada`,
          );
        }
        return [fromUser, toUser];
      }),
    );
  }
}
