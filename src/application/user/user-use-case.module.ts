import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/infrastructure';
import { UserFactoryService } from './fatories';
import { RechargeAccountUseCase, RegisterUserUseCase } from './use-cases';

@Module({
  imports: [DataServicesModule],
  providers: [UserFactoryService, RegisterUserUseCase, RechargeAccountUseCase],
  exports: [UserFactoryService, RegisterUserUseCase, RechargeAccountUseCase],
})
export class UserUseCaseModule {}
