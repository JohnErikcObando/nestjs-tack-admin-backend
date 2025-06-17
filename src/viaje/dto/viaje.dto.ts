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
  IsInt,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateViajeDto {
  @ApiProperty({
    description: 'Número de manifiesto del viaje',
    example: 'MNFT-2023-001',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  manifiesto: string;

  @ApiProperty({
    description: 'Fecha en que se realizó el viaje',
    example: '2023-10-10',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @ApiProperty({
    description: 'ID del municipio de origen',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  origenId: number;

  @ApiProperty({
    description: 'ID del municipio de destino',
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  destinoId: number;

  @ApiProperty({
    description: 'Valor total del viaje',
    example: 1500000.0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  valor: number;

  @ApiProperty({
    description: 'Comisión por el viaje',
    example: 150000.0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  comision?: number;

  @ApiProperty({
    description: 'Costo de descargue',
    example: 50000.0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  descargue?: number;

  @ApiProperty({
    description: 'Valor del cheque',
    example: 200000.0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cheque?: number;

  @ApiProperty({
    description: 'Valor neto del viaje (calculado automáticamente)',
    example: 1300000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  total_neto?: number;

  @ApiProperty({
    description: '65% del valor neto (calculado automáticamente)',
    example: 845000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  porcentaje_65?: number;

  @ApiProperty({
    description: '35% del valor neto (calculado automáticamente)',
    example: 455000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  porcentaje_35?: number;

  @ApiProperty({
    description: 'Valor del anticipo recibido',
    example: 500000.0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  valor_anticipo?: number;

  @ApiProperty({
    description: 'Saldo pendiente por pagar (calculado automáticamente)',
    example: 1000000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  saldo_a_pagar?: number;

  @ApiProperty({
    description: 'Saldos de anticipos (calculado automáticamente)',
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
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  pago_completado?: boolean;

  @ApiProperty({
    description: 'URL del comprobante de pago',
    example: 'https://drive.google.com/comprobante.pdf',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  link_comprobante?: string;

  @ApiProperty({
    description: 'ID de la empresa asociada al viaje',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  empresaId: number;
}

export class UpdateViajeDto extends PartialType(CreateViajeDto) {}

export class UpdatePagoCompletadoDto {
  @ApiProperty({
    description: 'Indica si el pago está completado',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  pago_completado: boolean;
}
