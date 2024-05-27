import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { CustomizationEventDto } from './dto/customization-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'kafkajs';

@Injectable()
export class CustomizationProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: CustomizationEventDto[]) {
    const messages = await this.buildMessages(
      'avro/customization/create_customization_event_dto.avsc',

      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: CustomizationEventDto[]) {
    const messages = await this.buildMessages(
      'avro/customization/delete_customization_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: CustomizationEventDto[]) {
    const messages = await this.buildMessages(
      'avro/customization/patch_customization_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: CustomizationEventDto[]) {
    const messages = await this.buildMessages(
      'avro/customization/update_customization_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  private buildMessages(
    subject: string,
    events: CustomizationEventDto[],
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
