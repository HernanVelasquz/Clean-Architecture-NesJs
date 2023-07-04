import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { Observable, from } from 'rxjs';
import {
  RegisterUserDto,
  TransferDtoInput,
  TransferOutputDto,
  TransferResolver,
  UserOutputDto,
  UserResolver,
} from 'src/infrastructure/graphql';

/**
 * Controlador de la API de Gateway.
 *
 * @useGuards AuthGuard('jwt')
 * @controller
 */
@UseGuards(AuthGuard('jwt'))
@Controller()
export class GetWayApiController {
  /**
   * Constructor de la clase GetWayApiController.
   *
   * @param {UserResolver} resolverUser - Resolver de usuarios.
   * @param {TransferResolver} resolverTransfer - Resolver de transferencias.
   */
  constructor(
    private readonly resolverUser: UserResolver,
    private readonly resolverTransfer: TransferResolver,
  ) {}

  /**
   * Obtiene la cuenta de un usuario por su correo electrónico.
   *
   * @get getAccount/:email
   * @returns {Observable<UserOutputDto | UserOutputDto[] | null>} - El usuario encontrado o null si no se encuentra.
   * @param {string} email - Correo electrónico del usuario.
   */
  @Get('getAccount/:email')
  getAccountUser(
    @Param('email') email: string,
  ): Observable<UserOutputDto | UserOutputDto[] | null> {
    return from(this.resolverUser.getUserEmail(email));
  }

  /**
   * Registra un nuevo usuario.
   *
   * @post registerUser
   * @param {RegisterUserDto} newUser - Datos del nuevo usuario a registrar.
   */
  @Post('registerUser')
  registerUser(@Body() newUser: RegisterUserDto) {
    return from(this.resolverUser.registerUser(newUser));
  }

  /**
   * Obtiene el historial de transferencias de un cliente.
   *
   * @get getHistory/:client_id
   * @returns {Observable<TransferOutputDto[]>} - El historial de transferencias del cliente.
   * @param {string} client_id - ID del cliente para obtener su historial de transferencias.
   */
  @Get('getHistory/:client_id')
  getHistoryTransfer(
    @Param('client_id', new ParseUUIDPipe({ version: '4' })) client_id: string,
  ): Observable<TransferOutputDto[]> {
    return from(this.resolverTransfer.getHistoryTransfer(client_id));
  }

  /**
   * Registra una nueva transferencia.
   *
   * @post registerTransfer
   * @param {TransferDtoInput} createTransferDto - Datos de la transferencia a registrar.
   */
  @Post('registerTransfer')
  registerTransfer(@Body() createTransferDto: TransferDtoInput) {
    return from(this.resolverTransfer.registerTransfer(createTransferDto));
  }
}
