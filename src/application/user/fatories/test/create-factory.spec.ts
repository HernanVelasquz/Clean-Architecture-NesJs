import { UserFactoryService } from '../user-factory.service';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';

describe('Create User Factory', () => {
  let userFactoryService: UserFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFactoryService],
    }).compile();

    userFactoryService = module.get<UserFactoryService>(UserFactoryService);
  });

  describe('createNewUser', () => {
    it('should create a new user object', () => {
      const createUserDto: UserEntity = {
        id: '1',
        fullName: 'John Doe',
        typeDocument: 'DNI',
        numberDocument: '12345678',
        email: 'johndoe@example.com',
        transactions: [],
        deposit: 1000,
      };

      const newUser = userFactoryService.createNewUser(createUserDto);

      expect(newUser.fullName).toBe(createUserDto.fullName);
      expect(newUser.typeDocument).toBe(createUserDto.typeDocument);
      expect(newUser.numberDocument).toBe(createUserDto.numberDocument);
      expect(newUser.email).toBe(createUserDto.email);
      expect(newUser.transactions).toEqual([]);
      expect(newUser.deposit).toBe(1000);
    });
  });
});
