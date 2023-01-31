import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IContact, IPagination } from '@sika-app/contracts';
import {
  Contact,
  CreateContactUserDto,
  PaginationParams,
  UpdateUserDTO,
  UUIDValidationPipe,
} from '@sika-app/shared';
import { lastValueFrom } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { ContactService } from './contact.service';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * GET  contacts by pagination
   *
   * @param params
   * @returns
   */
  @Get('pagination')
  @UsePipes(new ValidationPipe({ transform: true }))
  async pagination(
    @Query() filters: PaginationParams<Contact>
  ): Promise<IPagination<IContact>> {
    return await lastValueFrom(this.contactService.paginate(filters));
  }

  /**
   * GET Contacts
   *
   * @param params
   * @returns
   */
  @ApiOperation({
    summary: 'Find all contacts.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found contacts.',
    type: Contact,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @Get()
  @UsePipes(new ValidationPipe())
  async findAll(
    @Query() filters: PaginationParams<Contact>
  ): Promise<IPagination<IContact>> {
    try {
      return await lastValueFrom(this.contactService.findAll(filters));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * CREATE new contact user
   *
   * @param entity
   * @returns
   */
  @ApiOperation({ summary: 'Create new record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The contact has been successfully created.' /*, type: T*/,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Invalid input, The response body may contain clues as to what went wrong',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateContactUserDto) {
    return this.contactService.createContact(dto);
  }

  /**
   * UPDATE contact user by id
   *
   * @param id
   * @param entity
   * @returns
   */
  @ApiOperation({ summary: 'Update contact record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The contact user record has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Invalid input, The response body may contain clues as to what went wrong',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', UUIDValidationPipe) id: IContact['id'],
    @Body() dto: UpdateUserDTO
  ) {
    return this.contactService.update(id, dto);
  }

  /**
   * DELTE contact
   *
   * @param id
   * @returns
   */
  @ApiOperation({
    summary: 'Delete record',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @Delete(':id')
  async delete(
    @Param('id', UUIDValidationPipe) id: IContact['id']
  ): Promise<DeleteResult> {
    console.log("🚀 ~ file: contact.controller.ts:153 ~ ContactController ~ id", id)
    
    return await lastValueFrom(this.contactService.delete(id));
  }
}
