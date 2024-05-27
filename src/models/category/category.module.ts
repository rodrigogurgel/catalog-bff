import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryProducerService } from 'src/config/events/kafka/category-producer/category-producer.service';
import { KafkaEventsProviderModule } from 'src/config/events/kafka/provider.module';

@Module({
  imports: [KafkaEventsProviderModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
