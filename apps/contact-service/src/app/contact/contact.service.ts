import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IContact } from '@sika-app/contracts';
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
  async update(
		id: IContact['id'],
		merchant: Contact
	): Promise<IContact> {
		return await this.contactRepository.save({ id, ...merchant });
	}
}
