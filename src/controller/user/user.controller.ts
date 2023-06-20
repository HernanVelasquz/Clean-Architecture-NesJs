import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { from, Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

import {
  RechargeAccountUseCase,
  RegisterUserUseCase,
} from 'src/application/user';
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

  @UseGuards(AuthGuard('jwt'))
  @Put()
  rechargeAccount(
    @Body() rechargeAcconut: RechargeAccountDto,
  ): Observable<UserEntity | null> {
    return from(this.rechargeAccountUseCase.rechargeAccount(rechargeAcconut));
  }
}
