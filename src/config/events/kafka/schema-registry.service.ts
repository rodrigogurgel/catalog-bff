import {
  SchemaRegistry,
  readAVSCAsync,
} from '@kafkajs/confluent-schema-registry';
import { Injectable } from '@nestjs/common';

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
}
