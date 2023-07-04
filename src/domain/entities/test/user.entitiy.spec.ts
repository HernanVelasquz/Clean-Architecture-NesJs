import { UserEntity } from '../user.entity';

describe('User Entity', () => {
  it('test_create_user_with_required_fields', () => {
    const user = new UserEntity();
    user.id = '1';
    user.fullName = 'John Doe';
    user.typeDocument = 'DNI';
    user.numberDocument = '12345678';
    user.email = 'johndoe@example.com';
    user.deposit = 1000;
    user.transactions = [];

    expect(user.id).toBe('1');
    expect(user.fullName).toBe('John Doe');
    expect(user.typeDocument).toBe('DNI');
    expect(user.numberDocument).toBe('12345678');
    expect(user.email).toBe('johndoe@example.com');
    expect(user.deposit).toBe(1000);
    expect(user.transactions).toEqual([]);
  });
});
