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
  CreateTipoDocumentoDto,
  UpdateTipoDocumentoDto,
} from '../dto/tipo_documento.dto';
import { TipoDocumentoService } from '../services/tipo_documento.service';

@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Post()
  async create(
    @Body()
    createTipoDocumentoDtoCreateTipoDocumentoDto: CreateTipoDocumentoDto,
  ) {
    return this.tipoDocumentoService.create(
      createTipoDocumentoDtoCreateTipoDocumentoDto,
    );
  }

  @Get()
  async findAll() {
    return this.tipoDocumentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tipoDocumentoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto,
  ) {
    return this.tipoDocumentoService.update(id, updateTipoDocumentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.tipoDocumentoService.remove(id);
  }
}
