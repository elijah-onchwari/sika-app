import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ContactService } from './contact.service';
import { CreateContactUserDto } from '@sika-app/shared';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @EventPattern('create_contact_user')
  handleCreateContact(@Payload(ValidationPipe) data: CreateContactUserDto) {
    console.log("🚀 ~ file: contact.controller.ts:12 ~ ContactController ~ handleCreateContact ~ data", data)
    
    this.contactService.create(data);
  }

  @MessagePattern('get_all_contacts')
  handleGetAllContacts() {
    return this.contactService.findAll();
  }
}
