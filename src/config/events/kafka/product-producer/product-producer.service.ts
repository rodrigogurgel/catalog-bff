import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { ProductEventDto } from './dto/product-event.dto';
import { IHeaders } from 'kafkajs';

@Injectable()
export class ProductProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: ProductEventDto[], headers: IHeaders = null) {
    const messages = await this.schemaRegistryService.build(
      'avro/product/create_product_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: ProductEventDto[], headers: IHeaders = null) {
    const messages = await this.schemaRegistryService.build(
      'avro/product/delete_product_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: ProductEventDto[], headers: IHeaders = null) {
    const messages = await this.schemaRegistryService.build(
      'avro/product/patch_product_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: ProductEventDto[], headers: IHeaders = null) {
    const messages = await this.schemaRegistryService.build(
      'avro/product/update_product_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }
}
