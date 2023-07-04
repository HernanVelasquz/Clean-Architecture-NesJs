import { Injectable } from '@nestjs/common';
import { from, Observable, catchError, throwError } from 'rxjs';
import { UserEntity } from '../../../domain/entities/user.entity';
import { DuplicateUserException } from '../../../infrastructure/exceptions/duplicateUserException.exception';
import { DependencyUserAbstract } from './abstracts';

/**
 * @class RegisterUserUseCase
 * @classdesc Clase que representa el caso de uso para registrar un usuario.
 * @extends DependencyUserAbstract
 */
@Injectable()
export class RegisterUserUseCase extends DependencyUserAbstract {
  /**
   * @method RegisterUserUseCase#register
   * @description Registra un nuevo usuario.
   * @param {UserEntity} createUserDto - Datos del usuario a registrar.
   * @returns {Observable<UserEntity>} Observable que emite el usuario registrado.
   * @throws {DuplicateUserException} Lanza una excepción si ya existe un usuario con el mismo correo electrónico.
   */
  public registerUser(createUserDto: UserEntity): Observable<UserEntity> {
    const userNew = this.userFactoryService.createNewUser(createUserDto);
    return from(this.dataServices.user.create(userNew)).pipe(
      catchError(() =>
        throwError(() => new DuplicateUserException(createUserDto.email)),
      ),
    );
  }
}
