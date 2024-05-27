import { Injectable } from '@nestjs/common';
import { Kafka, Message } from 'kafkajs';
@Injectable()
export class KafkaService {
  private kafka: Kafka;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'catalog-bff',
      brokers: ['localhost:9092'],
    });
  }
  async sendMessage(topic: string, messages: Message[]) {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: messages,
    });
    await producer.disconnect();
  }
}
