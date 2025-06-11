import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTipoDocumentoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;
}

export class UpdateTipoDocumentoDto extends PartialType(
  CreateTipoDocumentoDto,
) {}
