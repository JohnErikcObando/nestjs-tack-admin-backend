import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DocumentoService } from '../services/documento.service';
import { CreateDocumentoDto, UpdateDocumentoDto } from '../dto/documento.dto';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  async create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  async findAll() {
    return this.documentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.documentoService.findOne(id);
  }

  @Get('viaje/:viajeId') // Ruta: /documento/viaje/1
  async findByViajeId(@Param('viajeId') viajeId: number) {
  return this.documentoService.findByViajeId(viajeId);
}

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    return this.documentoService.update(id, updateDocumentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.documentoService.remove(id);
  }
}
