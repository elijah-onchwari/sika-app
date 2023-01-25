import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateContactUserDto } from '@sika-app/shared';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_MICROSERVICE') private readonly contactClient: ClientKafka
  ) {}

  createContactUser(createContactUserDto: CreateContactUserDto) {
    this.contactClient.emit(
      'create_contact_user',
      JSON.stringify(createContactUserDto)
    );
  }
}
