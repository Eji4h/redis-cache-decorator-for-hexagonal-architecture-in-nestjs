import { Module } from '@nestjs/common';
import { AdapterModule } from './adapters/adapter.module';
import { ApplicationModule } from './applications/application.module';

@Module({
  imports: [AdapterModule, ApplicationModule],
})
export class AppModule {}
