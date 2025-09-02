import {
  IsBoolean,
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
  INGRESO = 'Ingreso',
  GASTO = 'Gasto',
  ANTICIPOS = 'Anticipo',
}

export class CreateMovimientoDto {
  @ApiProperty({ example: '2023-10-15', description: 'Fecha del movimiento' })
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @ApiProperty({
    description: 'tipo del movimiento (Ingreso/Gasto)',
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
  link?: string;

  @ApiProperty({
    description: 'Indica si el pago está completado',
    example: false,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  pago?: boolean;
}

export class UpdateMovimientoDto extends PartialType(CreateMovimientoDto) {}

export class EstadoFinancieroDto {
  @ApiProperty({
    example: 1500000.0,
    description: 'Suma total de todos los anticipos registrados',
    type: Number,
  })
  @IsNumber()
  total_anticipos: number;

  @ApiProperty({
    example: 500000.0,
    description: 'Suma total de gastos pendientes de pago',
    type: Number,
  })
  @IsNumber()
  total_gastos_pendientes: number;

  @ApiProperty({
    example: 1000000.0,
    description: 'Saldo final (total_anticipos - total_gastos_pendientes)',
    type: Number,
  })
  @IsNumber()
  saldo_final: number;
}
