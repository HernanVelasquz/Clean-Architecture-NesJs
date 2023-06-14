import { from, Observable, switchMap } from 'rxjs';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

import { IGenericRepository } from 'src/domain';

export class TypeOrmGenericRepository<T extends ObjectLiteral>
  implements IGenericRepository<T>
{
  constructor(private readonly repository: Repository<T>) {}
  getAll(): Observable<T[]> {
    return from(this.repository.find());
  }

  get(id: string): Observable<T | null> {
    return from(
      this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>),
    );
  }

  getEmail(email: string): Observable<T | null> {
    return from(
      this.repository.findOneBy({ email } as unknown as FindOptionsWhere<T>),
    );
  }
  create(item: T): Observable<T> {
    return from(this.repository.save(item));
  }
  update(id: string, item: T): Observable<T | null> {
    return from(this.repository.update(String(id), item)).pipe(
      switchMap(() => this.get(id)),
    );
  }
}
