import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhereProperty,
} from 'typeorm';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { isClassInstance, isObject, parseToBoolean } from '@sika-app/common';


/**
 * Specifies what columns should be retrieved.
 */
export abstract class OptionsSelect<T = any> {

  @IsOptional()
  @Transform(({ value }: TransformFnParams) =>
    parseObject(value, parseToBoolean)
  )
  readonly select?: FindOptionsSelect<T>;
}

/**
 * Indicates what relations of entity should be loaded (simplified left join form).
 */
export abstract class OptionsRelations<T = any> extends OptionsSelect<T> {
  @IsOptional()
  readonly relations?: FindOptionsRelations<T>;
}

export abstract class OptionParams<T> extends OptionsRelations<T> {
  /**
   * Order, in which entities should be ordered.
   */
  @IsOptional()
  readonly order: FindOptionsOrder<T>;

  /**
   * Simple condition that should be applied to match entities.
   */
  @IsOptional()
  // @ValidateNested({ each: true })
  readonly where?: {
    [P in keyof T]?: FindOptionsWhereProperty<NonNullable<T[P]>>;
  };

  /**
   * Indicates if soft-deleted rows should be included in entity result.
   */

  @IsOptional()
  @Transform(({ value }: TransformFnParams) =>
    value ? parseToBoolean(value) : false
  )
  readonly withDeleted?: boolean;
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T = any> extends OptionParams<T> {
  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  @IsOptional()
  @Min(0)
  @Max(100)
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  readonly take: number = 10;

  /**
   * Offset (paginated) where from entities should be taken.
   */
  @IsOptional()
  @Min(0)
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  readonly skip: number = 0;
}

/**
 * Parse object to specific type
 *
 * @param source
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function parseObject(source: Object, callback: Function) {
  if (isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!isClassInstance(source[key])) {
          parseObject(source[key], callback);
        }
      } else {
        Object.assign(source, { [key]: callback(source[key]) });
      }
    }
  }
  return source;
}
