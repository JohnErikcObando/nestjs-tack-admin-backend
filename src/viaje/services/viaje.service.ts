import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  CreateViajeDto,
  UpdatePagoCompletadoDto,
  UpdateViajeDto,
} from '../dto/viaje.dto';
import { Viaje } from '../entities/viaje.entity';

@Injectable()
export class ViajeService {
  constructor(
    @Inject('VIAJE_REPOSITORY')
    private readonly viajeRepository: Repository<Viaje>,
  ) {}

  // Crear un nuevo viaje
  async create(createViajeDto: CreateViajeDto): Promise<Viaje> {
    const viaje = this.viajeRepository.create(createViajeDto);
    return await this.viajeRepository.save(viaje);
  }

  // Obtener todos los viajes
  async findAll(): Promise<Viaje[]> {
    return await this.viajeRepository.find({
      relations: [
        'empresa', // Carga la empresa
        'origen', // Carga el municipio origen
        'destino', // Carga el municipio destino
        'documentos', // Carga los documentos asociados
      ],
    });
  }

  // Obtener un viaje por su ID
  async findOne(id: number): Promise<Viaje> {
    const viaje = await this.viajeRepository.findOne({
      where: { id },
      relations: [
        'empresa', // Carga la empresa
        'origen', // Carga el municipio origen
        'destino', // Carga el municipio destino
        'documentos', // Carga los documentos asociados
      ],
    });

    if (!viaje) {
      throw new NotFoundException(`Viaje con ID ${id} no encontrado`);
    }
    return viaje;
  }

  // Actualizar un viaje existente
  async update(id: number, updateViajeDto: UpdateViajeDto): Promise<Viaje> {
    const viaje = await this.findOne(id); // Verifica si el viaje existe
    this.viajeRepository.merge(viaje, updateViajeDto); // Fusiona los datos
    return await this.viajeRepository.save(viaje); // Guarda los cambios
  }

  async updatePagoCompletado(
    id: number,
    dto: UpdatePagoCompletadoDto,
  ): Promise<Viaje> {
    const viaje = await this.findOne(id);
    viaje.pago_completado = dto.pago_completado;
    return await this.viajeRepository.save(viaje);
  }

  // Eliminar un viaje
  async remove(id: number): Promise<void> {
    const viaje = await this.findOne(id); // Verifica si el viaje existe
    await this.viajeRepository.remove(viaje);
  }
}
