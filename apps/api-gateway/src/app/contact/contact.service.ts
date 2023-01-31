import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  Contact,
  CreateContactUserDto,
  PaginationParams,
  UpdateUserDTO,
} from '@sika-app/shared';

@Injectable()
export class ContactService implements OnModuleInit {
  constructor(
    @Inject('CONTACT_MICROSERVICE') private readonly contactClient: ClientKafka
  ) {}

  onModuleInit() {
    this.contactClient.subscribeToResponseOf('find_all_contacts');
    this.contactClient.subscribeToResponseOf('pagination');
    this.contactClient.subscribeToResponseOf('delete_contact_user');
  }

  createContact(dto: CreateContactUserDto) {
    this.contactClient.emit('create_contact_user', JSON.stringify(dto));
  }

  findAll(filters: PaginationParams<Contact>) {
    return this.contactClient.send('find_all_contacts', filters);
  }

  paginate(filters: PaginationParams<Contact>) {
    return this.contactClient.send('pagination', filters);
  }

  update(id: string, dto: UpdateUserDTO) {
    return this.contactClient.emit(
      'update_contact_user',
      JSON.stringify({ id, dto })
    );
  }
  delete(id: string) {
    return this.contactClient.send('delete_contact_user', { id });
  }
}
