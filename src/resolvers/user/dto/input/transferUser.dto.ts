import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransferUserDto {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  toEmail: string;
  @Field(() => String)
  fromEmail: string;
  @Field(() => Number)
  valueTransfer: number;
  @Field(() => Date)
  date?: Date;
}
