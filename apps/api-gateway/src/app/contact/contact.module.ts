import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONTACT_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'contact',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'contact-consumer',
          },
        },
      },
    ]),
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
