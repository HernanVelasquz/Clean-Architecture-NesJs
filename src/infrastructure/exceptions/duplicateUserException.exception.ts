import { ConflictException } from '@nestjs/common';

export class DuplicateUserException extends ConflictException {
  constructor(email: string) {
    super(
      `El usuario con ${email} ya se encuentra registrado en la base de datos`,
    );
  }
}
