import { RegisterUserUseCase } from '../register-user.use-case';
import { DependencyUserAbstract } from '../abstracts';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserDto } from 'src/controllers/user/dto/input';
import { hash } from 'bcrypt';

describe('Register User Use Case', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let dependencyUserAbstractMock: Partial<DependencyUserAbstract>;

  beforeEach(async () => {
    dependencyUserAbstractMock = {
      user: {
        create: jest.fn(),
      },
      userFactoryService: {
        userFactoryService: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: DependencyUserAbstract,
          useValue: dependencyUserAbstractMock,
        },
      ],
    }).compile();

    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  it('should register a new user', (done) => {
    const createUserDto: RegisterUserDto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      typeDocument: '',
      numberDocument: '',
      id: '',
      deposit: 0,
      transactions: [],
    };
    const hashedPassword = 'hashedPassword';
    jest
      .spyOn(hash, 'call')
      .mockImplementationOnce(() => Promise.resolve(hashedPassword));

    const newUser = { ...createUserDto, password: hashedPassword };
    dependencyUserAbstractMock.userFactoryService.createNewUser.mockReturnValue(
      newUser,
    );
  });
});
