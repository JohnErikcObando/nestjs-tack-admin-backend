import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Viajes } from '../entities/viajes.entity';
import { CreateViajeDto } from '../dto/viajes.dto';
import { UpdateViajeDto } from '../dto/viajes.dto';

@Injectable()
export class ViajeService {
  constructor(
    @Inject('VIAJE_REPOSITORY')
    private readonly viajeRepository: Repository<Viajes>,
  ) {}

  // Crear un nuevo viaje
  async create(createViajeDto: CreateViajeDto): Promise<Viajes> {
    const viaje = this.viajeRepository.create(createViajeDto);
    return await this.viajeRepository.save(viaje);
  }

  // Obtener todos los viajes
  async findAll(): Promise<Viajes[]> {
    return await this.viajeRepository.find();
  }

  // Obtener un viaje por su ID
  async findOne(id: number): Promise<Viajes> {
    const viaje = await this.viajeRepository.findOne({ where: { id } });
    if (!viaje) {
      throw new NotFoundException(`Viaje con ID ${id} no encontrado`);
    }
    return viaje;
  }

  // Actualizar un viaje existente
  async update(id: number, updateViajeDto: UpdateViajeDto): Promise<Viajes> {
    const viaje = await this.findOne(id); // Verifica si el viaje existe
    this.viajeRepository.merge(viaje, updateViajeDto); // Fusiona los datos
    return await this.viajeRepository.save(viaje); // Guarda los cambios
  }

  // Eliminar un viaje
  async remove(id: number): Promise<void> {
    const viaje = await this.findOne(id); // Verifica si el viaje existe
    await this.viajeRepository.remove(viaje);
  }
}
