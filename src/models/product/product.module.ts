import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { KafkaEventsProviderModule } from 'src/config/events/kafka/provider.module';

@Module({
  imports: [KafkaEventsProviderModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
