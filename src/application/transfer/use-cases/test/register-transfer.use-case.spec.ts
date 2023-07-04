import { Observable } from 'rxjs';
import { UserFactoryService } from '../../../../application/user';
import { IDataServices, TransferEntity, UserEntity } from '../../../../domain';
import { InsufficientFundsException } from '../../../../infrastructure';
import { TransferFactoryService } from '../../factories';
import { RegisterTransferUseCase } from '../register-transfer.use-case';

import { InternalServerErrorException } from '@nestjs/common';

describe('RegisterTransferUseCase', () => {
  let registerTransferUseCase: RegisterTransferUseCase;
  let dataServices: IDataServices;
  let transferFactoryService: TransferFactoryService;
  let userFactoryService: UserFactoryService;

  const transferDto = new TransferEntity();
  transferDto.fromEmail = 'from@test.com';
  transferDto.toEmail = 'to@test.com';
  transferDto.valueTransfer = 500;

  const fromUser = new UserEntity();
  fromUser.id = '1';
  fromUser.fullName = 'From User';
  fromUser.email = 'from@test.com';
  fromUser.deposit = 1000;
  fromUser.transactions = [];

  const toUser = new UserEntity();
  toUser.id = '2';
  toUser.fullName = 'To User';
  toUser.email = 'to@test.com';
  toUser.deposit = 0;
  toUser.transactions = [];

  beforeEach(() => {
    dataServices = {
      user: {
        getAll: jest.fn().mockReturnValue(Promise.resolve([fromUser, toUser])),
        update: jest.fn(),
      },
      transfer: {
        create: jest.fn(),
      },
    } as any as IDataServices;

    transferFactoryService = {
      createNewTransfer: jest.fn().mockReturnValue(transferDto),
    };

    userFactoryService = {
      updateUser: jest.fn().mockReturnValue(fromUser),
    } as any as UserFactoryService;

    registerTransferUseCase = new RegisterTransferUseCase(
      dataServices,
      transferFactoryService,
      userFactoryService,
    );
  });

  it('should register a transfer and update user deposits', (done) => {
    const transferFacoty =
      transferFactoryService.createNewTransfer(transferDto);
    const updatedFromUser = { ...fromUser };
    const updatedToUser = { ...toUser };

    jest.spyOn(dataServices.transfer, 'create').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.next(transferFacoty);
          subscriber.complete();
        }),
    );

    const $result = registerTransferUseCase.registerTransfer(transferDto);

    $result.subscribe({
      next: (transfer) => {
        expect(transfer).toEqual(transferFacoty);
        expect(updatedFromUser.deposit).toEqual(1000);
        expect(updatedToUser.deposit).toEqual(0);
      },
      complete: () => done(),
    });
  });

  it('should throw an InsufficientFundsException when the transfer value exceeds the fromUser deposit', (done) => {
    transferDto.valueTransfer = 2000;

    const $result = registerTransferUseCase.registerTransfer(transferDto);

    $result.subscribe({
      error: (error) => {
        expect(error instanceof InsufficientFundsException).toBeTruthy();
        done();
      },
    });
  });

  it('should throw an InternalServerErrorException when either the fromUser or toUser does not have a registered account', (done) => {
    jest.spyOn(dataServices.user, 'getAll').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.next([fromUser]);
          subscriber.complete();
        }),
    );

    const $result = registerTransferUseCase.registerTransfer(transferDto);

    $result.subscribe({
      error: (error) => {
        expect(error instanceof InternalServerErrorException).toBeTruthy();
        done();
      },
    });
  });
});
