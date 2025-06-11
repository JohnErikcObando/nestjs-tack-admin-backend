import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateDepartamentoDto {
  @IsNotEmpty({ message: 'El nombre del departamento es obligatorio' })
  @IsString()
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'El código no puede exceder los 10 caracteres' })
  codigo?: string;
}

export class UpdateDepartamentoDto extends PartialType(CreateDepartamentoDto) {}
