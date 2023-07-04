import { NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { IDataServices, UserEntity } from '../../../../domain';
import { UserFactoryService } from '../../fatories';
import { RechargeAccountUseCase } from '../recharge-account.use-case';

describe('RechargeAccountUseCase', () => {
  let rechargeAccountUseCase: RechargeAccountUseCase;
  let dataService: IDataServices;
  let userFactoryService: UserFactoryService;

  const userRechargeAccount = new UserEntity();
  userRechargeAccount.email = 'john.doe@example.com';
  userRechargeAccount.deposit = 500;

  const existingUser = new UserEntity();
  existingUser.id = '1';
  existingUser.fullName = 'John Doe';
  existingUser.email = 'john.doe@example.com';
  existingUser.deposit = 1000;

  beforeEach(() => {
    dataService = {
      user: {
        getEmail: jest.fn(),
        create: jest.fn(),
      },
    } as any as IDataServices;

    userFactoryService = {
      updateUser: jest.fn().mockReturnValue(existingUser),
    } as any as UserFactoryService;

    rechargeAccountUseCase = new RechargeAccountUseCase(
      dataService,
      userFactoryService,
    );
  });

  it('should recharge a user account', (done) => {
    jest.spyOn(dataService.user, 'getEmail').mockImplementation(
      () =>
        new Observable((subcriber) => {
          subcriber.next(existingUser);
          subcriber.complete();
        }),
    );

    jest.spyOn(dataService.user, 'create').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.next(existingUser);
          subscriber.complete();
        }),
    );

    const $result = rechargeAccountUseCase.rechargeAccount(userRechargeAccount);

    $result.subscribe({
      next: (updatedUser) => {
        expect(updatedUser).toEqual(existingUser);
        expect(updatedUser?.deposit).toEqual(1500);
      },
      complete: () => done(),
    });
  });

  it('should throw a NotFoundException when trying to recharge an account that does not exist', (done) => {
    jest.spyOn(dataService.user, 'getEmail').mockImplementation(
      () =>
        new Observable((subcriber) => {
          subcriber.next(null);
          subcriber.complete();
        }),
    );
    const $result = rechargeAccountUseCase.rechargeAccount(userRechargeAccount);

    $result.subscribe({
      error: (error) => {
        expect(error instanceof NotFoundException).toBeTruthy();
        done();
      },
    });
  });
});
