import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { OptionEventDto } from './dto/option-event.dto';
import { IHeaders } from 'kafkajs';

@Injectable()
export class OptionProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: OptionEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/option/create_option_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: OptionEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/option/delete_option_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: OptionEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/option/patch_option_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: OptionEventDto[], headers: IHeaders) {
    const messages = await this.schemaRegistryService.build(
      'avro/option/update_option_event_dto.avsc',
      events,
      headers,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }
}
