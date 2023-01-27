import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  nationality: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ name: 'national_id', type: 'varchar' })
  nationalId: string;

  @Column({ type: 'varchar' })
  email: string;
}
