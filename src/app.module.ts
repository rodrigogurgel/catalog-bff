import { Module } from '@nestjs/common';
import { KafkaEventsProviderModule } from './config/events/kafka/provider.module';
import { CategoryModule } from './models/category/category.module';
import { CategoryProducerService } from './config/events/kafka/category-producer/category-producer.service';
import { SchemaRegistryService } from './config/events/kafka/schema-registry.service';
import { ProductModule } from './models/product/product.module';
import { CustomizationModule } from './models/customization/customization.module';
import { OptionModule } from './models/option/option.module';
import { ItemModule } from './models/item/item.module';

@Module({
  imports: [CategoryModule, KafkaEventsProviderModule, ProductModule, CustomizationModule, OptionModule, ItemModule],
  providers: [SchemaRegistryService],
})
export class AppModule {}
