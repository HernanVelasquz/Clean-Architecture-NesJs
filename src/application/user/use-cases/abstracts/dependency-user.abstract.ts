import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../../../domain';
import { UserFactoryService } from '../../fatories/user-factory.service';

/**
 * @class DependencyUserAbstract
 * @classdesc Clase abstracta que representa una dependencia abstracta para usuarios.
 * @description Esta clase proporciona acceso a los servicios de datos y al servicio de fábrica de usuarios.
 * @param {IDataServices} dataServices - Servicios de datos utilizados para acceder a los datos relacionados con los usuarios.
 * @param {UserFactoryService} userFactoryService - Servicio de fábrica de usuarios utilizado para crear instancias de la entidad de usuario.
 */
@Injectable()
export abstract class DependencyUserAbstract {
  constructor(
    protected readonly dataServices: IDataServices,
    protected readonly userFactoryService: UserFactoryService,
  ) {}
}
