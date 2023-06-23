import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/domain';
import { UserFactoryService } from '../user-factory.service';

describe('updateUser', () => {
  let userFactoryService: UserFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFactoryService],
    }).compile();

    userFactoryService = module.get<UserFactoryService>(UserFactoryService);
  });
  it('should create an updated user object', () => {
    const existingUser: UserEntity = {
      id: '1',
      fullName: 'John Doe',
      typeDocument: 'DNI',
      numberDocument: '12345678',
      email: 'johndoe@example.com',
      password: 'password123',
      transactions: [],
      deposit: 1000,
    };

    const updateUser: UserEntity = {
      id: '1',
      fullName: 'Updated Name',
      typeDocument: 'Updated DNI',
      numberDocument: '98765432',
      email: 'updatedemail@example.com',
      password: 'updatedpassword',
      transactions: [],
      deposit: 2000,
    };

    const updatedUser = userFactoryService.updateUser(updateUser);

    expect(updatedUser.id).toBe(existingUser.id);
    expect(updatedUser.fullName).toBe(updateUser.fullName);
    expect(updatedUser.typeDocument).toBe(updateUser.typeDocument);
    expect(updatedUser.numberDocument).toBe(updateUser.numberDocument);
    expect(updatedUser.email).toBe(updateUser.email);
    expect(updatedUser.password).toBe(updateUser.password);
    expect(updatedUser.transactions).toEqual([]);
    expect(updatedUser.deposit).toBe(updateUser.deposit);
  });
});
