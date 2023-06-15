import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/infrastructure';
import { UserFactoryService } from './fatories';
import {
  GetAccountUseCase,
  RechargeAccountUseCase,
  RegisterUserUseCase,
} from './use-cases';

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
