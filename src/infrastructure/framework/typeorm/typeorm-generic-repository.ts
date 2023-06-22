import { from, Observable, switchMap } from 'rxjs';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

import { IGenericRepository } from 'src/domain';

/**
 * @class TypeOrmGenericRepository
 * @classdesc Implementación genérica de un repositorio utilizando TypeORM.
 * @implements {IGenericRepository<T>}
 * @template T - Tipo genérico para la entidad.
 * @exports TypeOrmGenericRepository
 */
export class TypeOrmGenericRepository<T extends ObjectLiteral>
  implements IGenericRepository<T>
{
  /**
   * @constructor
   * @param {Repository<T>} repository - Repositorio de TypeORM para la entidad.
   */
  constructor(private readonly repository: Repository<T>) {}
  /**
   * @method getAll
   * @description Obtiene todos los elementos de la entidad.
   * @returns {Observable<T[]>} - Un observable que emite un arreglo de elementos de la entidad.
   */
  getAll(): Observable<T[]> {
    return from(this.repository.find());
  }

  /**
   * @method get
   * @description Obtiene un elemento de la entidad por su ID.
   * @param {string} id - ID del elemento a obtener.
   * @returns {Observable<T | null>} - Un observable que emite el elemento encontrado o null si no se encuentra.
   */
  get(id: string): Observable<T | null> {
    return from(
      this.repository.findOneBy({
        id,
      } as unknown as FindOptionsWhere<T>),
    );
  }

  /**
   * @method getEmail
   * @description Obtiene un elemento de la entidad por su dirección de correo electrónico.
   * @param {string} email - Dirección de correo electrónico del elemento a obtener.
   * @returns {Observable<T | null | T[]>} - Un observable que emite el elemento encontrado, null si no se encuentra o un arreglo de elementos si hay coincidencias múltiples.
   */
  getEmail(email: string): Observable<T | null | T[]> {
    return from(
      this.repository.findOneBy({ email } as unknown as FindOptionsWhere<T>),
    );
  }
  /**
   * @method create
   * @description Crea un nuevo elemento de la entidad.
   * @param {T} item - El elemento a crear.
   * @returns {Observable<T>} - Un observable que emite el elemento creado.
   */
  create(item: T): Observable<T> {
    return from(this.repository.save(item));
  }

  /**
   * @method update
   * @description Actualiza un elemento de la entidad por su ID.
   * @param {string} id - ID del elemento a actualizar.
   * @param {T} item - El elemento actualizado.
   * @returns {Observable<T | null>} - Un observable que emite el elemento actualizado o null si no se encuentra el elemento original.
   */
  update(id: string, item: T): Observable<T | null> {
    return from(this.repository.update(String(id), item)).pipe(
      switchMap(() => this.get(id)),
    );
  }
}
