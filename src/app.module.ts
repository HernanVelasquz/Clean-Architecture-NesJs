import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';

import { TransferUseCaseModule } from './application/transfer/transfer-use-case.module';
import { UserUseCaseModule } from './application/user/user-use-case.module';
import { AuthorizationModule } from './infrastructure/authorization/authorization.module';
import { DataServicesModule } from './infrastructure/data-service/data-service.module';
import { UserResolver } from './infrastructure/graphql/user/user.resolver';
import { GetWayApiController } from './controllers/getwayApi.controller';
import { TransferResolver } from './infrastructure/graphql';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    DataServicesModule,
    UserUseCaseModule,
    TransferUseCaseModule,
    AuthorizationModule,
  ],
  controllers: [GetWayApiController],
  providers: [UserResolver, TransferResolver],
})
export class AppModule {}
