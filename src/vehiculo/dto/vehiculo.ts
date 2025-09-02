import { IsString, IsBoolean, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateVehiculoDto {
  @ApiProperty({
    description: 'Placa del vehículo',
    example: 'ABC123',
    minLength: 6,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 10, { message: 'La placa debe tener entre 6 y 10 caracteres' })
  placa: string;

  @ApiProperty({
    description: 'Marca del vehículo',
    example: 'Toyota',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: 'La marca debe tener entre 2 y 50 caracteres' })
  marca: string;

  @ApiProperty({
    description: 'Modelo del vehículo',
    example: 'Hilux',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50, { message: 'El modelo debe tener entre 1 y 50 caracteres' })
  modelo: string;

  @ApiProperty({
    description: 'Estado del vehículo (activo/inactivo)',
    example: true,
    default: true,
  })
  @IsBoolean()
  activo: boolean;
}

export class UpdateVehiculoDto extends PartialType(CreateVehiculoDto) {}
