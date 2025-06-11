import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMunicipioDto {
  @ApiProperty({ example: 'MEDELLIN', description: 'Nombre del municipio' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    example: '001',
    description: 'Código del municipio',
    required: false,
  })
  @IsString()
  @MaxLength(10)
  codigo?: string;

  @ApiProperty({
    example: 1,
    description: 'ID del departamento al que pertenece',
  })
  @IsNotEmpty()
  @IsNumber()
  departamento_id: number;
}

export class UpdateMunicipioDto extends PartialType(CreateMunicipioDto) {}
