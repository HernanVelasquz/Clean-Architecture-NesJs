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
    newUser.deposit = 1000;
    return newUser;
  }

  updateUserDeposit(updateUserDeposit: UserEntity) {
    const newUser = new UserEntity();
    newUser.fullName = updateUserDeposit.fullName;
    newUser.typeDocument = updateUserDeposit.typeDocument;
    newUser.numberDocument = updateUserDeposit.numberDocument;
    newUser.email = updateUserDeposit.email;
    newUser.password = updateUserDeposit.password;
    newUser.deposit = updateUserDeposit.deposit;
    return newUser;
  }
}
