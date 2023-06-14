import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../infrastructure/data-service/data-service.module';
import { UserFactoryService } from './user-factory.service';
import { UserUseCase } from './user.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [UserFactoryService, UserUseCase],
  exports: [UserFactoryService, UserUseCase],
})
export class UserUseCaseModule {}
