import { Body, Controller, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import { RegisterTransferUseCase } from 'src/application';
import { TransferEntity } from 'src/domain';
import { TransferDto } from './dto';

@Controller('transfer')
export class TransferController {
  constructor(
    private readonly registerTrnasferUseCase: RegisterTransferUseCase,
  ) {}

  @Post()
  registerTransfer(
    @Body() createUserDto: TransferDto,
  ): Observable<TransferEntity> {
    return from(this.registerTrnasferUseCase.registerTransfer(createUserDto));
  }
}
