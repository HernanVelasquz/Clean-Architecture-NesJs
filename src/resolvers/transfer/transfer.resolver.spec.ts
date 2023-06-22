import { Test, TestingModule } from '@nestjs/testing';
import { TransferResolver } from './transfer.resolver';

describe('TransferResolver', () => {
  let resolver: TransferResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferResolver],
    }).compile();

    resolver = module.get<TransferResolver>(TransferResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
