import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { from, Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

import {
  RechargeAccountUseCase,
  RegisterUserUseCase,
} from 'src/application/user';
import { UserEntity } from 'src/domain';
import { RechargeAccountDto, RegisterUserDto } from './dto';

/**
 * @class UserController
 * @classdesc Controlador para las rutas relacionadas con los usuarios.
 * @param {RegisterUserUseCase} registerUserUseCase - Caso de uso para registrar un usuario.
 * @param {RechargeAccountUseCase} rechargeAccountUseCase - Caso de uso para recargar la cuenta de un usuario.
 */
@Controller('user')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly rechargeAccountUseCase: RechargeAccountUseCase,
  ) {}

  /**
   * Ruta POST para registrar un nuevo usuario.
   * @route POST /user
   * @param {RegisterUserDto} registerUserDto - Datos del usuario a registrar.
   * @returns {Observable<UserEntity>} El usuario registrado.
   */
  @Post()
  registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Observable<UserEntity> {
    return from(this.registerUserUseCase.register(registerUserDto));
  }

  /**
   * Ruta PUT para recargar la cuenta de un usuario.
   * @route PUT /user
   * @param {RechargeAccountDto} rechargeAcconut - Datos de la recarga de cuenta.
   * @returns {Observable<UserEntity|null>} El usuario con la cuenta recargada o null si no se encuentra.
   */
  @UseGuards(AuthGuard('jwt'))
  @Put()
  rechargeAccount(
    @Body() rechargeAcconut: RechargeAccountDto,
  ): Observable<UserEntity | null> {
    return from(this.rechargeAccountUseCase.rechargeAccount(rechargeAcconut));
  }
}
