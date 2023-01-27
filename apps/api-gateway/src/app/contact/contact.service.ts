import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateContactUserDto } from '@sika-app/shared';

@Injectable()
export class ContactService implements OnModuleInit {
  constructor(
    @Inject('CONTACT_MICROSERVICE') private readonly contactClient: ClientKafka
  ) {}

  onModuleInit() {
    this.contactClient.subscribeToResponseOf('get_all_contacts');
  }

  createContactUser(createContactUserDto: CreateContactUserDto) {
    console.log(
      '🚀 ~ file: contact.service.ts:12 ~ ContactService ~ createContactUser ~ createContactUserDto',
      createContactUserDto
    );
    this.contactClient.emit(
      'create_contact_user',
      JSON.stringify(createContactUserDto)
    );
  }

  getAllContacts() {
    return this.contactClient.send('get_all_contacts', '');
  }
}
