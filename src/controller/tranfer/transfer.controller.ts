import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import {
  GetHistoryTransferUseCase,
  RegisterTransferUseCase,
} from 'src/application';
import { TransferEntity } from 'src/domain';
import { TransferDto } from './dto';

@Controller('transfer')
export class TransferController {
  constructor(
    private readonly registerTransferUseCase: RegisterTransferUseCase,
    private readonly getHistoryTransferUseCase: GetHistoryTransferUseCase,
  ) {}

  @Post()
  registerTransfer(
    @Body() createUserDto: TransferDto,
  ): Observable<TransferEntity> {
    return from(this.registerTransferUseCase.registerTransfer(createUserDto));
  }

  @Get(':client_id')
  getHistoryTransfer(@Param('client_id') client_id: string): Observable<any> {
    return from(
      this.getHistoryTransferUseCase.historyTransferUseCase(client_id),
    );
  }
}
