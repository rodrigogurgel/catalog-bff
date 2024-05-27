import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { KafkaEventsProviderModule } from 'src/config/events/kafka/provider.module';

@Module({
  imports: [KafkaEventsProviderModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
