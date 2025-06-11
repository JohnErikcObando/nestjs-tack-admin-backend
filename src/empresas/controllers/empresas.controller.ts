import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { EmpresasService } from '../services/empresas.service';
import { CreateEmpresaDTO, UpdateEmpresaDTO } from '../dtos/empresa.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly EmpresaService: EmpresasService) {}

  @Post()
  async create(@Body() createEmpresaDto: CreateEmpresaDTO) {
    return this.EmpresaService.create(createEmpresaDto);
  }

  @Get()
  async findAll() {
    return this.EmpresaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.EmpresaService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEmpresaDto: UpdateEmpresaDTO,
  ) {
    return this.EmpresaService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.EmpresaService.remove(id);
  }
}
