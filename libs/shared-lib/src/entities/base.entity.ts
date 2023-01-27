import { IBaseEntity } from '@sika-app/contracts';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Model {
  constructor(intialData: Partial<Model> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
}
export abstract class BaseEntity extends Model implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
