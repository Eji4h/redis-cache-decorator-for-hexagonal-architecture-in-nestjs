import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { booleanParser } from '../../../shares/adapters/inbounds/boolean.parser';

export class GetItemsV1Dto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => booleanParser(value))
  available?: boolean;
}
