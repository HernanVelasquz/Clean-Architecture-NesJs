import { Observable } from 'rxjs';

/**
 * @class IGenericRepository
 * @classdesc Interfaz abstracta para un repositorio genérico.
 * @template T - Tipo de objeto que se manejará en el repositorio.
 */
export abstract class IGenericRepository<T> {
  /**
   * @method IGenericRepository#getAll
   * @description Obtiene todos los objetos del repositorio.
   * @returns {Observable<T[]>} Observable que emite un array de objetos del tipo T.
   */
  abstract getAll(): Observable<T[]>;
  /**
   * @method IGenericRepository#get
   * @description Obtiene un objeto del repositorio por su identificador.
   * @param {string} id - Identificador del objeto a obtener.
   * @returns {Observable<T | null | T[]>} Observable que emite el objeto encontrado o null si no se encuentra. En algunos casos, puede emitir un array de objetos del tipo T.
   */
  abstract get(id: string): Observable<T | null | T[]>;
  /**
   * @method IGenericRepository#getEmail
   * @description Obtiene un objeto del repositorio por su correo electrónico.
   * @param {string} email - Correo electrónico del objeto a obtener.
   * @returns {Observable<T | null | T[]>} Observable que emite el objeto encontrado o null si no se encuentra. En algunos casos, puede emitir un array de objetos del tipo T.
   */
  abstract getEmail(email: string): Observable<T | null | T[]>;
  /**
   * @method IGenericRepository#create
   * @description Crea un nuevo objeto en el repositorio.
   * @param {T} item - Objeto a crear.
   * @returns {Observable<T>} Observable que emite el objeto creado.
   */
  abstract create(item: T): Observable<T>;
  abstract update(id: string, item: T): Observable<T | null>;
  /**
   * @method IGenericRepository#update
   * @description Actualiza un objeto existente en el repositorio por su identificador.
   * @param {string} id - Identificador del objeto a actualizar.
   * @param {T} item - Objeto actualizado.
   * @returns {Observable<T | null>} Observable que emite el objeto actualizado o null si no se encuentra el objeto a actualizar.
   */
}
