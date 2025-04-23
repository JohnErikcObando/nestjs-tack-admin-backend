import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsBoolean,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateViajeDto {
  @ApiProperty({
    description: 'manifiesto del viaje realizado',
    example: '00000',
  })
  @IsNotEmpty()
  @IsString()
  manifiesto: string;

  @ApiProperty({
    description: 'Fecha del viaje',
    example: '2023-10-10T12:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @ApiProperty({ description: 'Lugar de origen', example: 'Ciudad A' })
  @IsNotEmpty()
  @IsString()
  origen: string;

  @ApiProperty({ description: 'Lugar de destino', example: 'Ciudad B' })
  @IsNotEmpty()
  @IsString()
  destino: string;

  @ApiProperty({ description: 'Valor del viaje', example: 1000.5 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  valor: number;

  @ApiProperty({
    description: 'Comisión del viaje',
    example: 100.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  comision?: number;

  @ApiProperty({
    description: 'Valor de descargue',
    example: 50.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  descargue?: number;

  @ApiProperty({
    description: 'Valor del cheque',
    example: 200.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cheque?: number;

  @ApiProperty({ description: 'Total neto del viaje', example: 800.4 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  total_neto: number;

  @ApiProperty({
    description: 'Porcentaje 65% del total neto',
    example: 520.26,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  porcentaje_65: number;

  @ApiProperty({
    description: 'Porcentaje 35% del total neto',
    example: 280.14,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  porcentaje_35: number;

  @ApiProperty({
    description: 'Valor del anticipo',
    example: 300.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  valor_anticipo?: number;

  @ApiProperty({ description: 'Saldo a pagar', example: 500.4 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  saldo_a_pagar: number;

  @ApiProperty({
    description: 'Saldos de anticipos',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  saldos_anticipos?: number;

  @ApiProperty({
    description: 'Indica si el pago está completado',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  pago_completado?: boolean;

  @ApiProperty({
    description: 'Enlace al comprobante de pago',
    example: 'https://example.com/comprobante',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  link_comprobante?: string;

  @ApiProperty({
    description: 'Fecha de creación del viaje',
    example: '2024-10-10T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha_creacion?: string;
}

export class UpdateViajeDto extends PartialType(CreateViajeDto) {}
