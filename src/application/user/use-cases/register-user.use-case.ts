import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { from, Observable, switchMap } from 'rxjs';
import { UserEntity } from 'src/domain';
import { DependencyAbstract } from './abstracts/dependency.abstract';

@Injectable()
export class RegisterUserUseCase extends DependencyAbstract {
  public register(createUserDto: UserEntity): Observable<UserEntity> {
    return from(hash(createUserDto.password, 10)).pipe(
      switchMap((hash: string) => {
        createUserDto.password = hash;
        const newUser = this.userFactoryService.createNewUser(createUserDto);
        return from(this.dataServices.user.create(newUser));
      }),
    );
  }
}
