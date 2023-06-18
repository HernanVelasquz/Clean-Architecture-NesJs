import { Observable } from 'rxjs';

export abstract class IGenericRepository<T> {
  abstract getAll(): Observable<T[]>;
  abstract get(id: string): Observable<T | null | T[]>;
  abstract getEmail(email: string): Observable<T | null | T[]>;
  abstract create(item: T): Observable<T>;
  abstract update(id: string, item: T): Observable<T | null>;
}
