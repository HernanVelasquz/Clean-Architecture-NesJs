import { Injectable } from '@nestjs/common/decorators';
import { from, Observable } from 'rxjs';
import { UserEntity } from 'src/domain';
import { DependencyUserAbstract } from './abstracts';

@Injectable()
export class GetAccountUseCase extends DependencyUserAbstract {
  getAccountEmail(email: string): Observable<UserEntity | UserEntity[] | null> {
    return from(this.dataServices.user.getEmail(email));
  }
}
