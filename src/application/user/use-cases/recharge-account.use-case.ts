import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';

import { UserEntity } from '../../../domain';
import { DependencyUserAbstract } from './abstracts';

/**
 * @class RechargeAccountUseCase
 * @classdesc Clase que representa el caso de uso para recargar una cuenta.
 * @extends DependencyUserAbstract
 */
@Injectable()
export class RechargeAccountUseCase extends DependencyUserAbstract {
  /**
   * @method RechargeAccountUseCase#rechargeAccount
   * @description Recarga una cuenta de usuario.
   * @param {UserEntity} userRechargeAccount - Objeto de la cuenta de usuario a recargar.
   * @returns {Observable<UserEntity | null>} Observable que emite la cuenta de usuario actualizada o null si no se encuentra la cuenta.
   * @throws {NotFoundException} Lanza una excepción si no se encuentra la cuenta de usuario.
   */
  public rechargeAccount(
    userRechargeAccount: UserEntity,
  ): Observable<UserEntity | null> {
    return from(
      this.dataServices.user.getEmail(userRechargeAccount.email),
    ).pipe(
      switchMap((user: UserEntity) => {
        user.deposit += userRechargeAccount.deposit;
        const newSaldUser = this.userFactoryService.updateUser(user);
        return from(this.dataServices.user.create(newSaldUser));
      }),
      catchError(() =>
        throwError(() => new NotFoundException('User not found')),
      ),
    );
  }
}
