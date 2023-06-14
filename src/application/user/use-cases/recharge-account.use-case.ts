import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';

import { UserEntity } from 'src/domain';
import { DependencyAbstract } from './abstracts';

@Injectable()
export class RechargeAccountUseCase extends DependencyAbstract {
  public rechargeAccount(
    userRechargeAccount: UserEntity,
  ): Observable<UserEntity | null> {
    return from(
      this.dataServices.user.getEmail(userRechargeAccount.email),
    ).pipe(
      switchMap((user: UserEntity) => {
        user.deposit += userRechargeAccount.deposit;
        const newSadalUser = this.userFactoryService.updateUser(user);
        return from(this.dataServices.user.create(newSadalUser));
      }),
      catchError(() =>
        throwError(() => new NotFoundException('User not found')),
      ),
    );
  }
}
