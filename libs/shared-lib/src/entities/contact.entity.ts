import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('contacts')
export class Contact extends BaseEntity {
  @ApiProperty({ type: () => String })
  @IsString()
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @Column({ type: 'varchar' })
  country: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @Column({ type: 'varchar' })
  nationality: string;

  // @ApiProperty({ type: () => String })
  // @IsString()
  @Column({ type: 'date' })
  birthday: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @Column({ type: 'varchar' })
  gender: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @Column({ name: 'national_id', type: 'varchar' })
  nationalId: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @IsEmail()
  @Column({ type: 'varchar' })
  email: string;
}
