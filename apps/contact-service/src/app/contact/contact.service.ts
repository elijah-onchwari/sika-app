import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact, CrudService } from '@sika-app/shared';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService extends CrudService<Contact> {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
  ) {
    super(contactRepository);
  }
}
