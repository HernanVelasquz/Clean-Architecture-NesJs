import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { hash } from 'bcrypt';
import { from, Observable, switchMap, catchError, throwError } from 'rxjs';

import { IDataServices, UserEntity } from 'src/domain';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly userFactoryService: UserFactoryService,
  ) {}

  public register(createUserDto: UserEntity): Observable<UserEntity> {
    return from(hash(createUserDto.password, 10)).pipe(
      switchMap((hash: string) => {
        createUserDto.password = hash;
        const newUser = this.userFactoryService.createNewUser(createUserDto);
        return from(this.dataServices.user.create(newUser));
      }),
    );
  }

  public rechargeAccount(
    userRechargeAccount: UserEntity,
  ): Observable<UserEntity | null> {
    return from(
      this.dataServices.user.getEmail(userRechargeAccount.email),
    ).pipe(
      switchMap((user: UserEntity) => {
        user.deposit += userRechargeAccount.deposit;
        const newSadalUser = this.userFactoryService.updateUser(user);
        return from(this.dataServices.user.create(newSadalUser));
      }),
      catchError(() =>
        throwError(() => new NotFoundException('User not found')),
      ),
    );
  }
}
