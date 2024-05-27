import {
  SchemaRegistry,
  readAVSCAsync,
} from '@kafkajs/confluent-schema-registry';
import { Injectable } from '@nestjs/common';
import { IHeaders, Message } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SchemaRegistryService {
  private registry: SchemaRegistry;
  constructor() {
    this.registry = new SchemaRegistry({
      host: 'http://localhost:8081',
    });
  }

  async encode(avroFilePath: string, body: any): Promise<Buffer> {
    const schema = await readAVSCAsync(avroFilePath);
    const subject = `${schema.namespace}.${schema.name}`;
    const schemaId = await this.registry.getRegistryIdBySchema(subject, schema);
    return await this.registry.encode(schemaId, body);
  }

  async build(
    subject: string,
    events: any[],
    headers: IHeaders = null,
  ): Promise<Message[]> {
    return Promise.all(
      events.map(async (event) => {
        return {
          key: uuidv4(),
          value: await this.encode(subject, event),
          headers,
        };
      }),
    );
  }
}
