import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepartamentosService } from '../services/departamentos.service';

import {
  CreateDepartamentoDto,
  UpdateDepartamentoDto,
} from '../dtos/departamento.dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly DepartamentoService: DepartamentosService) {}

  @Post()
  async create(
    @Body() createDepartamentoDtoCreateDepartamentoDto: CreateDepartamentoDto,
  ) {
    return this.DepartamentoService.create(
      createDepartamentoDtoCreateDepartamentoDto,
    );
  }

  @Get()
  async findAll() {
    return this.DepartamentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.DepartamentoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDepartamentoDtoUpdateDepartamentoDto: UpdateDepartamentoDto,
  ) {
    return this.DepartamentoService.update(
      id,
      updateDepartamentoDtoUpdateDepartamentoDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.DepartamentoService.remove(id);
  }
}
