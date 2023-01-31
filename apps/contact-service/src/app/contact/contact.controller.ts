import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ContactService } from './contact.service';
import {
  Contact,
  CreateContactUserDto,
  PaginationParams,
} from '@sika-app/shared';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @EventPattern('create_contact_user')
  handleCreateContact(@Payload(ValidationPipe) data: CreateContactUserDto) {
    this.contactService.create(data);
  }

  @MessagePattern('find_all_contacts')
  handleGetAllContacts(data: PaginationParams<Contact>) {
    return this.contactService.findAll(data);
  }

  @MessagePattern('update_contact_user')
  handleGetContactById(data: any) {
    return this.contactService.update(data.id, data.dto);
  }

  @MessagePattern('delete_contact_user')
  handleDeleteContact(data: any) {
    return this.contactService.delete(data.id);
  }
}
