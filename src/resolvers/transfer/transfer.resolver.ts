import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TransferResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
