import { GetAccountUseCase } from '../getAccount.use-case';
import { IDataServices, UserEntity } from '../../../../domain';
import { Observable } from 'rxjs';
import { UserFactoryService } from '../../fatories';

describe('Get Account Use Case', () => {
  let getAccountUseCase: GetAccountUseCase;
  let dataService: IDataServices;

  beforeEach(() => {
    dataService = {
      user: {
        getEmail: jest.fn(),
      },
    } as any as IDataServices;

    const userFactoyService = {
      createNewUser: jest.fn(),
    } as any as UserFactoryService;

    getAccountUseCase = new GetAccountUseCase(dataService, userFactoyService);
  });

  it('should return user account by email', (done) => {
    const email = 'test@example.com';
    const user = new UserEntity();
    user.id = '1';
    user.fullName = 'John Doe';
    user.email = email;
    user.typeDocument = 'cc';
    user.numberDocument = '1234567890';
    user.password = 'secredPassword';
    user.deposit = 1000;
    user.transactions = [];

    jest.spyOn(dataService.user, 'getEmail').mockImplementation(
      () =>
        new Observable((subscribe) => {
          subscribe.next(user);
          subscribe.complete();
        }),
    );

    const result$ = getAccountUseCase.getAccountEmail(email);

    result$.subscribe({
      next: (user) => {
        if (user instanceof UserEntity) {
          expect(user.email).toEqual(email);
        }
      },
      complete: () => done(),
    });
  });
});
