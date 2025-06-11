import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TipoDocumento } from '../entities/tipo_documento.entity';
import {
  CreateTipoDocumentoDto,
  UpdateTipoDocumentoDto,
} from '../dto/tipo_documento.dto';

@Injectable()
export class TipoDocumentoService {
  constructor(
    @Inject('TIPO_DOCUMENTO_REPOSITORY')
    private readonly documentoRepository: Repository<TipoDocumento>,
  ) {}

  // Crear un nuevo tipoDocumento
  async create(
    createTipoDocumentoDto: CreateTipoDocumentoDto,
  ): Promise<TipoDocumento> {
    const tipoDocumento = this.documentoRepository.create(
      createTipoDocumentoDto,
    );
    return await this.documentoRepository.save(tipoDocumento);
  }

  // Obtener todos los tipoDocumento
  async findAll(): Promise<TipoDocumento[]> {
    return await this.documentoRepository.find();
  }

  // Obtener un tipoDocumento por su ID
  async findOne(id: number): Promise<TipoDocumento> {
    const documento = await this.documentoRepository.findOne({
      where: { id },
    });
    if (!documento) {
      throw new NotFoundException(`documento con ID ${id} no encontrado`);
    }
    return documento;
  }

  // Actualizar un tipoDocumento existente
  async update(
    id: number,
    updateTipoDocumentoDto: UpdateTipoDocumentoDto,
  ): Promise<TipoDocumento> {
    const tipoDocumento = await this.findOne(id); // Verifica si el tipoDocumento existe
    this.documentoRepository.merge(tipoDocumento, updateTipoDocumentoDto); // Fusiona los datos
    return await this.documentoRepository.save(tipoDocumento); // Guarda los cambios
  }

  // Eliminar un documento
  async remove(id: number): Promise<void> {
    const tipoDocumento = await this.findOne(id); // Verifica si el tipoDocumento existe
    await this.documentoRepository.remove(tipoDocumento);
  }
}
