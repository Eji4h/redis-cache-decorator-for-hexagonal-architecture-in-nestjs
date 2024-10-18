import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule],
})
export class AppModule {}
