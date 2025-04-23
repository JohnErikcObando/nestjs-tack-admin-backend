import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsPhoneNumber,
  IsMobilePhone,
} from 'class-validator';

export class CreateEmpresaDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{9}-[0-9]$/, {
    message: 'El NIT debe tener el formato 123456789-0',
  })
  nit: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('CO') // Ajusta el código de país según necesites
  telefono?: string;

  @IsString()
  @IsOptional()
  @IsMobilePhone('es-CO') // Validación para celular en Colombia
  celular?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateEmpresaDTO extends PartialType(CreateEmpresaDTO) {}
