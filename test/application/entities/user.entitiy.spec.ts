import { Test } from '@nestjs/testing';
import { UserEntity } from 'src/domain';

describe('User Entity', () => {
  // Tests that a new user can be created with all required fields
  it('test_create_user_with_required_fields', () => {
    const user = new UserEntity();
    user.id = '123';
    user.fullName = 'John Doe';
    user.typeDocument = 'ID';
    user.numberDocument = '123456789';
    user.email = 'johndoe@example.com';
    user.password = 'password';
    user.deposit = 0;

    expect(user.id).toBe('123');
    expect(user.fullName).toBe('John Doe');
    expect(user.typeDocument).toBe('ID');
    expect(user.numberDocument).toBe('123456789');
    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).toBe('password');
    expect(user.deposit).toBe(0);
  });
});
