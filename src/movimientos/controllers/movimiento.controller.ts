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
  CreateMovimientoDto,
  UpdateMovimientoDto,
} from '../dto/movimiento.dto';
import { MovimientoService } from '../services/movimiento.service';

@Controller('movimientos')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Post()
  async create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientoService.create(createMovimientoDto);
  }

  @Get()
  async findAll() {
    return this.movimientoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.movimientoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMovimientoDtoUpdateMovimientoDto: UpdateMovimientoDto,
  ) {
    return this.movimientoService.update(
      id,
      updateMovimientoDtoUpdateMovimientoDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.movimientoService.remove(id);
  }
}
