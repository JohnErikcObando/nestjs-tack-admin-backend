import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VehiculoService } from '../services/vehiculo.service';
import { CreateVehiculoDto, UpdateVehiculoDto } from '../dto/vehiculo';

@Controller('vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  async create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculoService.create(createVehiculoDto);
  }

  @Get()
  async findAll() {
    return this.vehiculoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vehiculoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVehiculoDto: UpdateVehiculoDto,
  ) {
    return this.vehiculoService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.vehiculoService.remove(id);
  }
}
