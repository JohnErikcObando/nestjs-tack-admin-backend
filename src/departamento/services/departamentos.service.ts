import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  CreateDepartamentoDto,
  UpdateDepartamentoDto,
} from '../dtos/departamento.dto';

import { Departamento } from '../entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @Inject('DEPARTAMENTO_REPOSITORY')
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  // Crear un nuevo departamento
  async create(
    createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    const departamento = this.departamentoRepository.create(
      createDepartamentoDto,
    );
    return await this.departamentoRepository.save(departamento);
  }

  // Obtener todos los departamentos
  async findAll(): Promise<Departamento[]> {
    return await this.departamentoRepository.find();
  }

  // Obtener un departamento por su ID
  async findOne(id: number): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({
      where: { id },
      relations: ['municipios'],
    });
    if (!departamento) {
      throw new NotFoundException(`departamento con ID ${id} no encontrado`);
    }
    return departamento;
  }

  // Actualizar un departamento existente
  async update(
    id: number,
    updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    const departamento = await this.findOne(id); // Verifica si el departamento existe
    this.departamentoRepository.merge(departamento, updateDepartamentoDto); // Fusiona los datos
    return await this.departamentoRepository.save(departamento); // Guarda los cambios
  }

  // Eliminar un departamento
  async remove(id: number): Promise<void> {
    const departamento = await this.findOne(id); // Verifica si el departamento existe
    await this.departamentoRepository.remove(departamento);
  }
}
