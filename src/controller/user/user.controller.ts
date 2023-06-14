import { Body, Controller, Post } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { from, Observable } from 'rxjs';

import { RechargeAccountUseCase } from 'src/application/user/use-cases/recharge-account.use-case';
import { RegisterUserUseCase } from 'src/application/user/use-cases/register-user.use-case';
import { UserEntity } from 'src/domain';
import { RechargeAccountDto, RegisterUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly rechargeAccountUseCase: RechargeAccountUseCase,
  ) {}

  @Post()
  registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Observable<UserEntity> {
    return from(this.registerUserUseCase.register(registerUserDto));
  }

  @Put()
  rechargeAccount(
    @Body() rechargeAcconut: RechargeAccountDto,
  ): Observable<UserEntity | null> {
    return from(this.rechargeAccountUseCase.rechargeAccount(rechargeAcconut));
  }
}
