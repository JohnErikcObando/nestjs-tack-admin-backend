import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export enum Tipo {
  INGRESO = 'ingreso',
  GASTO = 'gasto',
}

export class CreateMovimientoDto {
  @ApiProperty({ example: '2023-10-15', description: 'Fecha del movimiento' })
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @ApiProperty({
    description: 'tipo del movimiento (ingreso/gasto)',
    example: 'ingreso',
    enum: Tipo,
    default: Tipo.INGRESO,
  })
  @IsEnum(Tipo, {
    message: 'Tipo no válido. Opciones válidas: ingreso, gasto',
  })
  tipo: Tipo;

  @ApiProperty({
    example: 'Pago por servicio de transporte',
    description: 'Descripción del movimiento',
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 1500000.5, description: 'Valor del movimiento' })
  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @ApiProperty({
    example: 'https://drive.google.com/comprobante.pdf',
    description: 'Enlace al comprobante',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  link?: string;
}

export class UpdateMovimientoDto extends PartialType(CreateMovimientoDto) {}
