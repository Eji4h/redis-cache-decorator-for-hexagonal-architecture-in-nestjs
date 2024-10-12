import { CreateItemCommand } from '../../applications/usecases';

import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateItemV1Dto implements CreateItemCommand {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
