import { UserEntity } from 'src/domain';
import { IsNotEmpty, IsEmail, IsPositive } from 'class-validator';

export class RechargeAccountDto extends UserEntity {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPositive()
  deposit: number;
}
