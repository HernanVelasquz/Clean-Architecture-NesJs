import { Test, TestingModule } from '@nestjs/testing';
import { TransferEntity, UserEntity } from '../../../../domain';
import { TransferFactoryService } from '../transfer-factory.service';

describe('Create Transfer Factory', () => {
  let transferFactoyService: TransferFactoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferFactoryService],
    }).compile();

    transferFactoyService = module.get<TransferFactoryService>(
      TransferFactoryService,
    );
  });

  describe('', () => {
    it('should create a new transfer object', () => {
      const createTransferDto: TransferEntity = {
        id: '1',
        fromEmail: 'test1@algo.com',
        toEmail: 'test2@algo.com',
        valueTransfer: 200,
        date: new Date(),
        user: new UserEntity(),
      };

      const newTransfer =
        transferFactoyService.createNewTransfer(createTransferDto);

      expect(newTransfer.fromEmail).toBe(createTransferDto.fromEmail);
      expect(newTransfer.toEmail).toBe(createTransferDto.toEmail);
      expect(newTransfer.user).toBeInstanceOf(UserEntity);
    });
  });
});
