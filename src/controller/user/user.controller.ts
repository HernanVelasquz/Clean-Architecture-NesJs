import { Body, Controller, Post } from '@nestjs/common';
import { UserUseCase } from 'src/application/user/user.use-case';
import { from, Observable } from 'rxjs';
import { UserEntity } from 'src/domain';
import { RegisterUserDto } from './dto/register-user.dto';
import { RechargeAccountDto } from './dto';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Observable<UserEntity> {
    return from(this.userUseCase.register(registerUserDto));
  }

  @Put()
  rechargeAccount(
    @Body() rechargeAcconut: RechargeAccountDto,
  ): Observable<UserEntity | null> {
    return from(this.userUseCase.rechargeAccount(rechargeAcconut));
  }
}
