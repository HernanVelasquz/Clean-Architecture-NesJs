import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../domain/abstracts/data-services.abstract';
import { UserFactoryService } from './user-factory.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { Observable, from, switchMap } from 'rxjs';
import { hash } from 'bcrypt';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly userFactoryService: UserFactoryService,
  ) {}
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
