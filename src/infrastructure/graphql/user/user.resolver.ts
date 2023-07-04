import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { from, Observable } from 'rxjs';

import {
  RechargeAccountUseCase,
  RegisterUserUseCase,
} from '../../../application';
import { GetAccountUseCase } from '../../../application/user/use-cases/getAccount.use-case';
import { RechargeAccountDto, RegisterUserDto, UserOutputDto } from './dto';

/**
 * Resolver de usuarios.
 *
 * @resolver User
 */
@Resolver('User')
export class UserResolver {
  /**
   * Constructor de la clase UserResolver.
   *
   * @param {RegisterUserUseCase} registerUserUseCase - Caso de uso para registrar usuarios.
   * @param {RechargeAccountUseCase} rechargeAccountUseCase - Caso de uso para recargar cuentas.
   * @param {GetAccountUseCase} getAccountUseCase - Caso de uso para obtener cuentas.
   */
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly rechargeAccountUseCase: RechargeAccountUseCase,
    private readonly getAccountUseCase: GetAccountUseCase,
  ) {}

  /**
   * Registra un usuario.
   *
   * @mutation
   * @returns {Observable<UserOutputDto>} - El usuario registrado.
   * @param {RegisterUserDto} registerUser - Datos del usuario a registrar.
   */
  @Mutation(() => UserOutputDto)
  registerUser(
    @Args('registerUser') registerUser: RegisterUserDto,
  ): Observable<UserOutputDto> {
    return from(this.registerUserUseCase.registerUser(registerUser));
  }

  /**
   * Recarga una cuenta.
   *
   * @mutation
   * @returns {Observable<UserOutputDto | null>} - El usuario actualizado o null si no se encuentra.
   * @param {RechargeAccountDto} rechargeAccount - Datos de la recarga de cuenta.
   */
  @Mutation(() => UserOutputDto)
  rechargeAccount(
    @Args('rechargeAcconut') rechargeAcconut: RechargeAccountDto,
  ): Observable<UserOutputDto | null> {
    return from(this.rechargeAccountUseCase.rechargeAccount(rechargeAcconut));
  }

  /**
   * Obtiene un usuario por su correo electrónico.
   *
   * @query
   * @returns {Observable<UserOutputDto | UserOutputDto[] | null>} - El usuario encontrado o null si no se encuentra.
   * @param {string} email - Correo electrónico del usuario a buscar.
   */
  @Query(() => UserOutputDto)
  getUserEmail(
    @Args('email') email: string,
  ): Observable<UserOutputDto | UserOutputDto[] | null> {
    return from(this.getAccountUseCase.getAccountEmail(email));
  }
}
