import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/infrastructure';
import { AuthorizationModule } from 'src/infrastructure/authorization/authorization.module';
import { UserFactoryService } from './fatories';
import {
  GetAccountUseCase,
  RechargeAccountUseCase,
  RegisterUserUseCase,
} from './use-cases';

/**
 * @class UserUseCaseModule
 * @classdesc Módulo que encapsula los casos de uso relacionados con los usuarios.
 * @exports UserUseCaseModule
 * @imports DataServicesModule - Módulo de servicios de datos utilizado por los usuarios.
 * @providers
 *   UserFactoryService - Servicio de fábrica de usuarios.
 *   RegisterUserUseCase - Caso de uso para registrar un usuario.
 *   RechargeAccountUseCase - Caso de uso para recargar una cuenta de usuario.
 *   GetAccountUseCase - Caso de uso para obtener la información de una cuenta de usuario.
 * @exports
 *   UserFactoryService - Servicio de fábrica de usuarios.
 *   RegisterUserUseCase - Caso de uso para registrar un usuario.
 *   RechargeAccountUseCase - Caso de uso para recargar una cuenta de usuario.
 *   GetAccountUseCase - Caso de uso para obtener la información de una cuenta de usuario.
 */
@Module({
  imports: [DataServicesModule],
  providers: [
    UserFactoryService,
    RegisterUserUseCase,
    RechargeAccountUseCase,
    GetAccountUseCase,
  ],
  exports: [
    UserFactoryService,
    RegisterUserUseCase,
    RechargeAccountUseCase,
    GetAccountUseCase,
  ],
})
export class UserUseCaseModule {}
