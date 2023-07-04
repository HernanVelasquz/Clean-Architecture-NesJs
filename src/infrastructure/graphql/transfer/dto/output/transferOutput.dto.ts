import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class TransferOutputDto {
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
