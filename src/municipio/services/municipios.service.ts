import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Municipio } from '../entities/municipio.entity';
import { CreateMunicipioDto, UpdateMunicipioDto } from '../dtos/municipio.dto';

@Injectable()
export class MunicipiosService {
  constructor(
    @Inject('MUNICIPIO_REPOSITORY')
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  // Crear un nuevo municipio
  async create(
    createMunicipioDtoCreateMunicipioDto: CreateMunicipioDto,
  ): Promise<Municipio> {
    const municipio = this.municipioRepository.create(
      createMunicipioDtoCreateMunicipioDto,
    );
    return await this.municipioRepository.save(municipio);
  }

  // Obtener todos los municipios
  async findAll(): Promise<Municipio[]> {
    return await this.municipioRepository.find();
  }

  // Obtener un municipio por su ID
  async findOne(id: number): Promise<Municipio> {
    const municipio = await this.municipioRepository.findOne({ where: { id } });
    if (!municipio) {
      throw new NotFoundException(`municipio con ID ${id} no encontrado`);
    }
    return municipio;
  }

  // Actualizar un municipio existente
  async update(
    id: number,
    updateMunicipioDtoUpdateMunicipioDto: UpdateMunicipioDto,
  ): Promise<Municipio> {
    const municipio = await this.findOne(id); // Verifica si el municipio existe
    this.municipioRepository.merge(
      municipio,
      updateMunicipioDtoUpdateMunicipioDto,
    ); // Fusiona los datos
    return await this.municipioRepository.save(municipio); // Guarda los cambios
  }

  // Eliminar un municipio
  async remove(id: number): Promise<void> {
    const municipio = await this.findOne(id); // Verifica si el municipio existe
    await this.municipioRepository.remove(municipio);
  }
}
