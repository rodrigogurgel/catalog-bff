import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { CustomizationEventDto } from './dto/customization-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { IHeaders, Message } from 'kafkajs';

@Injectable()
export class CustomizationProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: CustomizationEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/customization/create_customization_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: CustomizationEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/customization/delete_customization_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: CustomizationEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/customization/patch_customization_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: CustomizationEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/customization/update_customization_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }
}
