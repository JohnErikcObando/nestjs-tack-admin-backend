import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MunicipiosService } from '../services/municipios.service';
import { CreateMunicipioDto, UpdateMunicipioDto } from '../dtos/municipio.dto';

@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Post()
  async create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipiosService.create(createMunicipioDto);
  }

  @Get()
  async findAll() {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.municipiosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMunicipioDto: UpdateMunicipioDto,
  ) {
    return this.municipiosService.update(id, updateMunicipioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.municipiosService.remove(id);
  }
}
