import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { from, Observable, switchMap, catchError, throwError } from 'rxjs';
import { UserEntity } from 'src/domain';
import { DuplicateUserException } from 'src/infrastructure';
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
  public register(createUserDto: UserEntity): Observable<UserEntity> {
    return from(hash(createUserDto.password, 10)).pipe(
      switchMap((hash: string) => {
        createUserDto.password = hash;
        const newUser = this.userFactoryService.createNewUser(createUserDto);
        return from(this.dataServices.user.create(newUser));
      }),
      catchError(() =>
        throwError(() => new DuplicateUserException(createUserDto.email)),
      ),
    );
  }
}
