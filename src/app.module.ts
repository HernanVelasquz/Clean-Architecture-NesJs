import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { DataServicesModule } from './infrastructure/data-service/data-service.module';
import { UserUseCaseModule } from './application/user/user-use-case.module';
import { UserController } from './controller/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trim()}`,
      ),
    }),
    DataServicesModule,
    UserUseCaseModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
