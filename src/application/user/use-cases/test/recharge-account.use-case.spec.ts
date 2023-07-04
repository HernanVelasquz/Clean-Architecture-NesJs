import { Observable, catchError } from 'rxjs';
import { IDataServices, UserEntity } from '../../../../domain';
import { UserFactoryService } from '../../fatories';
import { RechargeAccountUseCase } from '../recharge-account.use-case';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('Recharge Account Use Case', () => {
  let rechargeAccountUseCase: RechargeAccountUseCase;
  let dataService: IDataServices;
  let userFactoryService: UserFactoryService;

  beforeEach(() => {
    dataService = {
      user: {
        getEmail: jest.fn(),
        create: jest.fn(),
      },
    } as any as IDataServices;

    userFactoryService = {
      updateUser: jest.fn(),
    } as any as UserFactoryService;

    rechargeAccountUseCase = new RechargeAccountUseCase(
      dataService,
      userFactoryService,
    );
  });

  it('should recharge user account', (done) => {
    const userInput = new UserEntity();
    userInput.email = 'test@algo.com';
    userInput.deposit = 1000;

    const userRechargeAccount = new UserEntity();
    userRechargeAccount.id = '1';
    userRechargeAccount.fullName = 'John Doe';
    userRechargeAccount.email = userInput.email;
    userRechargeAccount.typeDocument = 'CC';
    userRechargeAccount.numberDocument = '1234567890';
    userRechargeAccount.password = 'secredPassword';
    userRechargeAccount.deposit = 1000;
    userRechargeAccount.transactions = [];

    jest.spyOn(dataService.user, 'getEmail').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.next(userRechargeAccount);
          subscriber.complete();
        }),
    );

    jest.spyOn(dataService.user, 'create').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.next(userRechargeAccount);
          subscriber.complete();
        }),
    );
    const $result = rechargeAccountUseCase.rechargeAccount(userInput);

    $result.subscribe({
      next: (user) => {
        if (user instanceof UserEntity) {
          expect(user.deposit).toEqual(2000);
          expect(user).toBeInstanceOf(NotFoundException);
        }
      },
      complete: () => done(),
    });
  });

  it('should throw NotFoundException if user not found', (done) => {
    const userInput = new UserEntity();
    userInput.email = 'testTesting@algo.com';
    userInput.deposit = 1000;

    const userRechargeAccount = new UserEntity();
    userRechargeAccount.id = '1';
    userRechargeAccount.fullName = 'John Doe';
    userRechargeAccount.email = userInput.email;
    userRechargeAccount.typeDocument = 'CC';
    userRechargeAccount.numberDocument = '1234567890';
    userRechargeAccount.password = 'secredPassword';
    userRechargeAccount.deposit = 1000;
    userRechargeAccount.transactions = [];

    jest.spyOn(dataService.user, 'getEmail').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.next(userRechargeAccount);
          subscriber.complete();
        }),
    );

    const $result = rechargeAccountUseCase.rechargeAccount(userInput);
    $result.subscribe({
      next: () => {
        done.fail(new Error('NotFoundException was not thrown.'));
      },
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        done();
      },
    });
  });
});
