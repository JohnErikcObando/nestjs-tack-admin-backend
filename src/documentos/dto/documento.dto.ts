import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateDocumentoDto {
  @IsNotEmpty()
  @IsNumber()
  viajeId: number;

  @IsNotEmpty()
  @IsNumber()
  tipoId: number;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {}
