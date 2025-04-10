import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUsuarioDTO,
  UpdateUsuarioDTO,
} from '@src/usuarios/dto/usuarios.dto';
import { UsuariosService } from '@src/usuarios/services/usuarios/usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDTO) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateViajeDto: UpdateUsuarioDTO,
  ) {
    return this.usuariosService.update(id, updateViajeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}
