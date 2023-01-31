import { IntersectionType } from '@nestjs/swagger';
import { IContact } from '@sika-app/contracts';
import { BaseDto } from './base.dto';
import { CreateContactUserDto } from './create-contact-user.dto';

/**
 * Update User DTO validation
 */
export class UpdateUserDTO
  extends IntersectionType(CreateContactUserDto, BaseDto)
  implements IContact {}
