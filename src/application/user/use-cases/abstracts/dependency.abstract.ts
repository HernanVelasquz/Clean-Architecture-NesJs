import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/domain';
import { UserFactoryService } from '../../fatories/user-factory.service';

@Injectable()
export abstract class DependencyAbstract {
  constructor(
    protected readonly dataServices: IDataServices,
    protected readonly userFactoryService: UserFactoryService,
  ) {}
}
