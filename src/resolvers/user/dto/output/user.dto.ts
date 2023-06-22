import { Field, ObjectType } from '@nestjs/graphql';
import { TransferEntity, UserEntity } from 'src/domain';
import { TransferUserDto } from '../input/transferUser.dto';

@ObjectType()
export class UserDto {
  @Field(() => String)
  id: string;
  @Field(() => String)
  fullName: string;
  @Field(() => String)
  typeDocument: string;
  @Field(() => String)
  numberDocument: string;
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  deposit: number;
  @Field(() => [TransferUserDto])
  transactions: TransferUserDto[];
}
