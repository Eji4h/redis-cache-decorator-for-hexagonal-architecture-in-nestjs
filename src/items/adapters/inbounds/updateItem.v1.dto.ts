import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UpdateItemCommand } from '../../applications/usecases';

export class UpdateItemV1Dto implements Omit<UpdateItemCommand, 'itemId'> {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  price?: number;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
