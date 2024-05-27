import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { ProductEventDto } from './dto/product-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'kafkajs';

@Injectable()
export class ProductProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: ProductEventDto[]) {
    const messages = await this.buildMessages(
      'avro/product/create_product_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: ProductEventDto[]) {
    const messages = await this.buildMessages(
      'avro/product/delete_product_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: ProductEventDto[]) {
    const messages = await this.buildMessages(
      'avro/product/patch_product_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: ProductEventDto[]) {
    const messages = await this.buildMessages(
      'avro/product/update_product_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  private buildMessages(
    subject: string,
    events: ProductEventDto[],
  ): Promise<Message[]> {
    return Promise.all(
      events.map(async (event) => {
        return {
          key: uuidv4(),
          value: await this.schemaRegistryService.encode(subject, event),
        };
      }),
    );
  }
}
