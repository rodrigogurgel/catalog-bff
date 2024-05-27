import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { ItemEventDto } from './dto/item-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { IHeaders, Message } from 'kafkajs';

@Injectable()
export class ItemProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: ItemEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/item/create_item_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: ItemEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/item/delete_item_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: ItemEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/item/patch_item_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: ItemEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/item/update_item_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }
}
