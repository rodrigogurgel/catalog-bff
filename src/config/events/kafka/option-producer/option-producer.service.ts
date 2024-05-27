import { Injectable } from '@nestjs/common';
import { SchemaRegistryService } from '../schema-registry.service';
import { KafkaService } from '../kafka.service';
import { OptionEventDto } from './dto/option-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'kafkajs';

@Injectable()
export class OptionProducerService {
  constructor(
    private readonly schemaRegistryService: SchemaRegistryService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(events: OptionEventDto[]) {
    const messages = await this.buildMessages(
      'avro/option/create_option_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async delete(events: OptionEventDto[]) {
    const messages = await this.buildMessages(
      'avro/option/delete_option_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async patch(events: OptionEventDto[]) {
    const messages = await this.buildMessages(
      'avro/option/patch_option_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  async update(events: OptionEventDto[]) {
    const messages = await this.buildMessages(
      'avro/option/update_option_event_dto.avsc',
      events,
    );

    this.kafkaService.sendMessage('catalog-input', messages);
  }

  private buildMessages(
    subject: string,
    events: OptionEventDto[],
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
