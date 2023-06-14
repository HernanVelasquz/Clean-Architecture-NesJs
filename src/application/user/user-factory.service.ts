import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';

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
}
