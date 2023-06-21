import { Injectable } from '@nestjs/common/decorators';
import { from, Observable } from 'rxjs';
import { UserEntity } from 'src/domain';
import { DependencyUserAbstract } from './abstracts';

/**
 * @class GetAccountUseCase
 * @classdesc Clase que representa el caso de uso para obtener una cuenta por correo electrónico.
 * @extends DependencyUserAbstract
 */
@Injectable()
export class GetAccountUseCase extends DependencyUserAbstract {
  /**
   * @method GetAccountUseCase#getAccountEmail
   * @description Obtiene una cuenta de usuario por su correo electrónico.
   * @param {string} email - Correo electrónico de la cuenta a obtener.
   * @returns {Observable<UserEntity | UserEntity[] | null>} Observable que emite la cuenta de usuario encontrada, una lista de cuentas o null si no se encuentra ninguna cuenta.
   */
  getAccountEmail(email: string): Observable<UserEntity | UserEntity[] | null> {
    return from(this.dataServices.user.getEmail(email));
  }
}
