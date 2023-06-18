import { Injectable } from '@nestjs/common';
import { TransferEntity } from 'src/domain';

@Injectable()
export class TransferFactoryService {
  createNewTransfer(createTransferDto: TransferEntity) {
    const newTransfer = new TransferEntity();
    newTransfer.toEmail = createTransferDto.toEmail;
    newTransfer.fromEmail = createTransferDto.fromEmail;
    newTransfer.valueTransfer = createTransferDto.valueTransfer;
    newTransfer.date = new Date();
    newTransfer.user = createTransferDto.user;
    return newTransfer;
  }
}
