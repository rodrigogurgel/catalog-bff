import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { ItemEventDto } from './dto/item-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'kafkajs';

@Injectable()
export class ItemProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: ItemEventDto[]) {
    const messages = await this.buildMessages(
      'avro/item/create_item_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: ItemEventDto[]) {
    const messages = await this.buildMessages(
      'avro/item/delete_item_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: ItemEventDto[]) {
    const messages = await this.buildMessages(
      'avro/item/patch_item_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: ItemEventDto[]) {
    const messages = await this.buildMessages(
      'avro/item/update_item_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  private buildMessages(
    subject: string,
    events: ItemEventDto[],
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
