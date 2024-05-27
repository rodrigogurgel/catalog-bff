import { Module } from '@nestjs/common';
import { CategoryProducerService } from './category-producer/category-producer.service';
import { KafkaService } from './kafka.service';
import { SchemaRegistryService } from './schema-registry.service';
import { ProductProducerService } from './product-producer/product-producer.service';
import { ItemProducerService } from './item-producer/item-producer.service';
import { OptionProducerService } from './option-producer/option-producer.service';
import { CustomizationProducerService } from './customization-producer/customization-producer.service';

@Module({
  providers: [
    KafkaService,
    SchemaRegistryService,
    CategoryProducerService,
    ProductProducerService,
    ItemProducerService,
    OptionProducerService,
    CustomizationProducerService,
  ],
  exports: [
    CategoryProducerService,
    ProductProducerService,
    ItemProducerService,
    OptionProducerService,
    CustomizationProducerService,
  ],
})
export class KafkaEventsProviderModule {}
