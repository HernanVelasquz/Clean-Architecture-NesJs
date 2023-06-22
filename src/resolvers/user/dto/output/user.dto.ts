import { Field, ObjectType } from '@nestjs/graphql';
import { TransferUserDto } from '../input/transferUser.dto';

@ObjectType()
export class UserDto {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  fullName: string;
  @Field(() => String)
  typeDocument: string;
  @Field(() => String)
  numberDocument: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  deposit: number;
  @Field(() => [TransferUserDto])
  transactions: TransferUserDto[];
}
