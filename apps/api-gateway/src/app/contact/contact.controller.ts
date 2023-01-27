import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateContactUserDto } from '@sika-app/shared';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  createContactUser(
    @Body(ValidationPipe) createContactUserDto: CreateContactUserDto
  ) {
    return this.contactService.createContactUser(createContactUserDto);
  }

  @Get()
  getAllContacts() {
    return this.contactService.getAllContacts();
  }
}
