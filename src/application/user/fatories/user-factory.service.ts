import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: UserEntity) {
    const newUser = new UserEntity();
    newUser.fullName = createUserDto.fullName;
    newUser.typeDocument = createUserDto.typeDocument;
    newUser.numberDocument = createUserDto.numberDocument;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.transactions = [];
    newUser.deposit = 1000;
    return newUser;
  }

  updateUser(updateUser: UserEntity) {
    const newUser = new UserEntity();
    newUser.id = updateUser.id;
    newUser.fullName = updateUser.fullName;
    newUser.typeDocument = updateUser.typeDocument;
    newUser.numberDocument = updateUser.numberDocument;
    newUser.email = updateUser.email;
    newUser.password = updateUser.password;
    newUser.deposit = updateUser.deposit;
    newUser.transactions = updateUser.transactions;
    return newUser;
  }
}
