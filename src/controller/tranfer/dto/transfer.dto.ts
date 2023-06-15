import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';
import { UserEntity } from 'src/domain';

export class TransferDto extends UserEntity {
  @IsEmail()
  @IsNotEmpty()
  toEmail: string;

  @IsEmail()
  @IsNotEmpty()
  fromEmail: string;

  @IsPositive()
  @IsNotEmpty()
  valueTransfer: number;
}
