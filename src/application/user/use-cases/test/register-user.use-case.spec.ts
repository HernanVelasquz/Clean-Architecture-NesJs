import { Observable } from 'rxjs';
import { IDataServices } from '../../../../domain';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { DuplicateUserException } from '../../../../infrastructure';
import { UserFactoryService } from '../../fatories';
import { RegisterUserUseCase } from '../register-user.use-case';

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let dataService: IDataServices;
  let userFactoryService: UserFactoryService;

  const createUserDto = new UserEntity();
  createUserDto.fullName = 'John Doe';
  createUserDto.email = 'john.doe@example.com';

  const createdUser = new UserEntity();
  createdUser.id = '1';
  createdUser.fullName = 'John Doe';
  createUserDto.typeDocument = 'CC';
  createUserDto.numberDocument = '1001976335';
  createdUser.email = 'john.doe@example.com';
  createUserDto.deposit = 1000;
  createUserDto.transactions = [];

  beforeEach(() => {
    dataService = {
      user: {
        create: jest.fn(),
      },
    } as any as IDataServices;

    userFactoryService = {
      createNewUser: jest.fn().mockReturnValue(createdUser),
    } as any as UserFactoryService;

    registerUserUseCase = new RegisterUserUseCase(
      dataService,
      userFactoryService,
    );
  });

  it('should register a new user', (done) => {
    jest.spyOn(dataService.user, 'create').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.next(createdUser);
          subscriber.complete();
        }),
    );

    const $result = registerUserUseCase.registerUser(createUserDto);

    $result.subscribe({
      next: (user) => {
        expect(user).toEqual(createdUser);
      },
      complete: () => done(),
    });
  });

  it('should throw a DuplicateUserException when trying to register a user with an existing email', (done) => {
    jest.spyOn(dataService.user, 'create').mockImplementation(
      () =>
        new Observable((subscriber) => {
          subscriber.error(new Error('Duplicate entry'));
        }),
    );

    const $result = registerUserUseCase.registerUser(createUserDto);

    $result.subscribe({
      error: (error) => {
        expect(error instanceof DuplicateUserException).toBeTruthy();
        done();
      },
    });
  });
});
