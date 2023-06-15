import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/domain';
import { TransferFactoryService } from '../../factories';

@Injectable()
export abstract class DependencyTransferAbstract {
  constructor(
    protected readonly dataServices: IDataServices,
    protected readonly transferFactoryService: TransferFactoryService,
  ) {}
}
