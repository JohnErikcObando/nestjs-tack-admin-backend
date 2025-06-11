import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Documento } from '../entities/documento.entity';
import { CreateDocumentoDto, UpdateDocumentoDto } from '../dto/documento.dto';
import { Tipo } from '@src/movimientos/dto/movimiento.dto';

@Injectable()
export class DocumentoService {
  constructor(
    @Inject('DOCUMENTO_REPOSITORY')
    private readonly documentoRepository: Repository<Documento>,
  ) {}

  // Crear un nuevo documento
  async create(createDocumentoDto: CreateDocumentoDto): Promise<Documento> {
    const documento = this.documentoRepository.create(createDocumentoDto);
    return await this.documentoRepository.save(documento);
  }

  // Obtener todos los documentos
  async findAll(): Promise<Documento[]> {
    return await this.documentoRepository.find();
  }

  // Obtener un documento por su ID
  async findOne(id: number): Promise<Documento> {
    const documento = await this.documentoRepository.findOne({
      where: { id },
    });
    if (!documento) {
      throw new NotFoundException(`documento con ID ${id} no encontrado`);
    }
    return documento;
  }

  async findByViajeId(viajeId: number): Promise<Documento[]> {
    return await this.documentoRepository.find({
      where: { viajeId },
      relations: ['viaje', 'tipoDocumento'],
    });
  }

  // Actualizar un documento existente
  async update(
    id: number,
    updateDocumentoDto: UpdateDocumentoDto,
  ): Promise<Documento> {
    const documento = await this.findOne(id); // Verifica si el documento existe
    this.documentoRepository.merge(documento, updateDocumentoDto); // Fusiona los datos
    return await this.documentoRepository.save(documento); // Guarda los cambios
  }

  // Eliminar un documento
  async remove(id: number): Promise<void> {
    const documento = await this.findOne(id); // Verifica si el documento existe
    await this.documentoRepository.remove(documento);
  }
}
