import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { from, Observable, map, switchMap } from 'rxjs';

import { UserFactoryService } from '../../../application/user';
import { IDataServices, TransferEntity, UserEntity } from '../../../domain';
import { InsufficientFundsException } from '../../../infrastructure';
import { TransferFactoryService } from '../factories';
import { DependencyTransferAbstract } from './abstracts';

/**
 * @class RegisterTransferUseCase
 * @classdesc Clase que representa el caso de uso para registrar una transferencia.
 * @extends DependencyTransferAbstract
 */
@Injectable()
export class RegisterTransferUseCase extends DependencyTransferAbstract {
  /**
   * @constructor
   * @param {IDataServices} dataServices - Servicios de datos utilizados para la transferencia.
   * @param {TransferFactoryService} transferFactoryService - Servicio de fábrica de transferencias.
   * @param {UserFactoryService} userFactoryService - Servicio de fábrica de usuarios.
   */
  constructor(
    protected readonly dataServices: IDataServices,
    protected readonly transferFactoryService: TransferFactoryService,
    private readonly userFactoryService: UserFactoryService,
  ) {
    super(dataServices, transferFactoryService);
  }

  /**
   * @method RegisterTransferUseCase#registerTransfer
   * @description Registra una transferencia.
   * @param {TransferEntity} transferDto - Datos de la transferencia a registrar.
   * @returns {Observable<TransferEntity>} Observable que emite la entidad de transferencia registrada.
   */
  public registerTransfer(
    transferDto: TransferEntity,
  ): Observable<TransferEntity> {
    return from(this.validateUser(transferDto)).pipe(
      switchMap((users) => {
        const [fromUser, toUser] = users;
        if (
          fromUser.deposit < transferDto.valueTransfer ||
          transferDto.valueTransfer > fromUser.deposit
        ) {
          throw new InsufficientFundsException();
        }
        fromUser.deposit -= transferDto.valueTransfer;
        toUser.deposit += transferDto.valueTransfer;
        transferDto.user = fromUser;
        const fromFactory = this.userFactoryService.updateUser(fromUser);
        const toFactory = this.userFactoryService.updateUser(toUser);
        const transferFacoty =
          this.transferFactoryService.createNewTransfer(transferDto);
        this.dataServices.user.update(fromFactory.id, fromFactory);
        this.dataServices.user.update(toFactory.id, toFactory);
        return from(this.dataServices.transfer.create(transferFacoty));
      }),
    );
  }

  /**
   * @method RegisterTransferUseCase#validateUser
   * @description Valida los usuarios involucrados en la transferencia.
   * @param {TransferEntity} userDto - Datos de la transferencia para validar los usuarios.
   * @returns {Observable<UserEntity[]>} Observable que emite un arreglo con los usuarios involucrados en la transferencia.
   * @throws {InternalServerErrorException} Error que se produce si uno o ambos usuarios no tienen una cuenta registrada.
   */
  private validateUser(userDto: TransferEntity): Observable<UserEntity[]> {
    const { fromEmail, toEmail } = userDto;
    return from(this.dataServices.user.getAll()).pipe(
      map((users: UserEntity[]) => {
        const fromUser = users.find((users) => users.email === fromEmail);
        const toUser = users.find((users) => users.email === toEmail);
        if (!fromUser || !toUser) {
          throw new InternalServerErrorException(
            `Al usuario que quiere realizar la transferencia no tiene cuenta registrada`,
          );
        }
        return [fromUser, toUser];
      }),
    );
  }
}
