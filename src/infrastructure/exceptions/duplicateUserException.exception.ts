import { ConflictException } from '@nestjs/common';

/**
 * @class DuplicateUserException
 * @classdesc Excepción personalizada para indicar un conflicto debido a un usuario duplicado.
 * @extends ConflictException
 */
export class DuplicateUserException extends ConflictException {
  /**
   * @constructor
   * @param {string} email - El email del usuario duplicado.
   */
  constructor(email: string) {
    super(
      `El usuario con ${email} ya se encuentra registrado en la base de datos`,
    );
  }
}
