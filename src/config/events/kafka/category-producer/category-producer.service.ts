import { Injectable } from '@nestjs/common';
import { CategoryEventDto } from './dto/category-event.dto';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'kafkajs';

@Injectable()
export class CategoryProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: CategoryEventDto[]) {
    const messages = await this.buildMessages(
      'avro/category/create_category_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: CategoryEventDto[]) {
    const messages = await this.buildMessages(
      'avro/category/delete_category_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: CategoryEventDto[]) {
    const messages = await this.buildMessages(
      'avro/category/patch_category_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: CategoryEventDto[]) {
    const messages = await this.buildMessages(
      'avro/category/update_category_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  private buildMessages(
    subject: string,
    events: CategoryEventDto[],
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
