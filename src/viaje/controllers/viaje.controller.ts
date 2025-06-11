import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ViajeService } from '../services/viaje.service';
import { CreateViajeDto, UpdateViajeDto } from '../dto/viaje.dto';

@Controller('viajes')
export class ViajeController {
  constructor(private readonly viajeService: ViajeService) {}

  @Post()
  async create(@Body() createViajeDto: CreateViajeDto) {
    return this.viajeService.create(createViajeDto);
  }

  @Get()
  async findAll() {
    return this.viajeService.findAll();
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

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.viajeService.remove(id);
  }
}
