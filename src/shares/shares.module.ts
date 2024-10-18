import { Module } from '@nestjs/common';
import { SharesAdapterModule } from './adapters/shares.adapter.module';

@Module({
  imports: [SharesAdapterModule],
})
export class SharesModule {}
