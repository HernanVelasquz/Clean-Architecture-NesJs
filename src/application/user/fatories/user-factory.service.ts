import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain';

/**
 * @class UserFactoryService
 * @classdesc Clase que representa el servicio de fábrica de usuarios.
 */
@Injectable()
export class UserFactoryService {
  /**
   * @method UserFactoryService#createNewUser
   * @description Crea un nuevo objeto de usuario a partir de los datos proporcionados en createUserDto.
   * @param {UserEntity} createUserDto - Datos del usuario para crear el nuevo usuario.
   * @returns {UserEntity} Nuevo objeto de usuario creado.
   */
  createNewUser(createUserDto: UserEntity) {
    const newUser = new UserEntity();
    newUser.fullName = createUserDto.fullName;
    newUser.typeDocument = createUserDto.typeDocument;
    newUser.numberDocument = createUserDto.numberDocument;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.transactions = [];
    newUser.deposit = 1000;
    return newUser;
  }

  /**
   * @method UserFactoryService#updateUser
   * @description Crea un nuevo objeto de usuario actualizado a partir de los datos proporcionados en updateUser.
   * @param {UserEntity} updateUser - Datos del usuario para actualizar el objeto de usuario existente.
   * @returns {UserEntity} Nuevo objeto de usuario actualizado.
   */
  updateUser(updateUser: UserEntity) {
    const newUser = new UserEntity();
    newUser.id = updateUser.id;
    newUser.fullName = updateUser.fullName;
    newUser.typeDocument = updateUser.typeDocument;
    newUser.numberDocument = updateUser.numberDocument;
    newUser.email = updateUser.email;
    newUser.password = updateUser.password;
    newUser.deposit = updateUser.deposit;
    newUser.transactions = updateUser.transactions;
    return newUser;
  }
}
