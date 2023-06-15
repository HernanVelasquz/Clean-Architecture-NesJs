import { Body, Controller, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RegisterTransferUseCase } from 'src/application/transfer/use-cases/register-transfer.use-case';
import { TransferEntity } from 'src/domain';

@Controller('transfer')
export class TransferController {
  constructor(
    private readonly registerTrnasferUseCase: RegisterTransferUseCase,
  ) {}

  @Post()
  registerTransfer(@Body() createUserDto: any): Observable<TransferEntity> {
    return from(this.registerTrnasferUseCase.registerTransfer(createUserDto));
  }
}
