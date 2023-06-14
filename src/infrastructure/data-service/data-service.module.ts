import { Module } from '@nestjs/common';
import { TypeormDataServicesModule } from '../framework';

@Module({
  imports: [TypeormDataServicesModule],
  exports: [TypeormDataServicesModule],
})
export class DataServicesModule {}
