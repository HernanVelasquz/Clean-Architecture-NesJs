import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * @class TypeOrmConfigService
 * @classdesc Servicio para configurar las opciones de TypeORM.
 * @implements {TypeOrmOptionsFactory}
 * @exports TypeOrmConfigService
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  /**
   * @constructor
   * @param {ConfigService} configService - Servicio de configuración para acceder a los valores de configuración.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * @method createTypeOrmOptions
   * @description Crea las opciones de configuración de TypeORM.
   * @returns {TypeOrmModuleOptions | Promise<TypeOrmModuleOptions>} - Opciones de configuración de TypeORM.
   */
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    };
  }
}
