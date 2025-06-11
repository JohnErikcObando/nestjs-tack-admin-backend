import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';

import { Empresa } from '../entities/empresa.entity';
import { CreateEmpresaDTO, UpdateEmpresaDTO } from '../dtos/empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(
    @Inject('EMPRESA_REPOSITORY')
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  // Crear un nuevo empresa
  async create(createEmpresaDTO: CreateEmpresaDTO): Promise<Empresa> {
    const empresa = this.empresaRepository.create(createEmpresaDTO);
    return await this.empresaRepository.save(empresa);
  }

  // Obtener todos los empresas
  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find();
  }

  // Obtener un viaje por su ID
  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({ where: { id } });
    if (!empresa) {
      throw new NotFoundException(`empresa con ID ${id} no encontrado`);
    }
    return empresa;
  }

  // Actualizar un empresa existente
  async update(
    id: number,
    UpdateEmpresaDTO: UpdateEmpresaDTO,
  ): Promise<Empresa> {
    const empresa = await this.findOne(id); // Verifica si el empresa existe
    this.empresaRepository.merge(empresa, UpdateEmpresaDTO); // Fusiona los datos
    return await this.empresaRepository.save(empresa); // Guarda los cambios
  }

  // Eliminar un empresa
  async remove(id: number): Promise<void> {
    const empresa = await this.findOne(id); // Verifica si el empresa existe
    await this.empresaRepository.remove(empresa);
  }
}
