import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';

import { RechargeAccountUseCase, RegisterUserUseCase } from 'src/application';
import { RechargeAccountDto, RegisterUserDto } from './dto/input';
import { UserDto } from './dto/output/user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@UseGuards(AuthGuard('jwt'))
@Resolver('User')
export class UserResolver {
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
  @ApiResponse({
    status: 201,
    description: 'Creacio de usuario de existosa',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya se encuentra registrado en la base de datos',
  })
  @Mutation(() => UserDto)
  registerUser(
    @Args('registerUser') registerUserDto: RegisterUserDto,
  ): Observable<UserDto> {
    return from(this.registerUserUseCase.register(registerUserDto));
  }

  /**
   * Ruta PUT para recargar la cuenta de un usuario.
   * @route PUT /user
   * @param {RechargeAccountDto} rechargeAcconut - Datos de la recarga de cuenta.
   * @returns {Observable<UserEntity|null>} El usuario con la cuenta recargada o null si no se encuentra.
   */
  @ApiResponse({
    status: 201,
    description: 'Recargar existosa',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Mutation(() => UserDto)
  rechargeAccount(
    @Args('rechargeAcconut') rechargeAcconut: RechargeAccountDto,
  ): Observable<UserDto | null> {
    return from(this.rechargeAccountUseCase.rechargeAccount(rechargeAcconut));
  }
}
