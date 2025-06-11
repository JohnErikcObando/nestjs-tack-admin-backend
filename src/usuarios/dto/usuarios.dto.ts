import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';

// Define los roles permitidos (enum)
export enum UserRol {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}

export class CreateUsuarioDTO {
  @ApiProperty({
    description: 'Nombre de usuario (4-20 caracteres)',
    example: 'juan123',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'Contraseña (mínimo 8 caracteres)',
    example: 'Password123*',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Nombre real del usuario (opcional)',
    example: 'Juan',
    required: false,
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({
    description: 'Apellido del usuario (opcional)',
    example: 'Pérez',
    required: false,
  })
  @IsString()
  @IsOptional()
  apellido?: string;

  @ApiProperty({
    description: 'Correo electrónico válido',
    example: 'juan@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Si el usuario está activo o no',
    example: true,
    default: true,
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    description: 'Rol del usuario (admin/user/manager)',
    example: 'user',
    enum: UserRol,
    default: UserRol.USER,
  })
  @IsEnum(UserRol, {
    message: 'Rol no válido. Opciones válidas: admin, user, manager',
  })
  rol: UserRol;
}

export class UpdateUsuarioDTO extends PartialType(CreateUsuarioDTO) {}
