import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ViajeService } from '../services/viaje.service';
import {
  CreateViajeDto,
  UpdatePagoCompletadoDto,
  UpdateViajeDto,
} from '../dto/viaje.dto';

@Controller('viajes')
export class ViajeController {
  constructor(private readonly viajeService: ViajeService) {}

  @Post()
  async create(@Body() createViajeDto: CreateViajeDto) {
    return this.viajeService.create(createViajeDto);
  }

  @Get()
  async findAll(
    @Query('fecha_inicio') fecha_inicio?: Date,
    @Query('fecha_final') fecha_final?: Date,
  ) {
    return this.viajeService.findAll(fecha_inicio, fecha_final);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.viajeService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateViajeDto: UpdateViajeDto,
  ) {
    return this.viajeService.update(id, updateViajeDto);
  }

  @Patch(':id/pago')
  async updatePagoCompletado(
    @Param('id') id: number,
    @Body() dto: UpdatePagoCompletadoDto,
  ) {
    return this.viajeService.updatePagoCompletado(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.viajeService.remove(id);
  }
}
