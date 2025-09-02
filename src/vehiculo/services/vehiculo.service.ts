import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Vehiculo } from '../entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { CreateVehiculoDto, UpdateVehiculoDto } from '../dto/vehiculo';

@Injectable()
export class VehiculoService {
  constructor(
    @Inject('VECHICULO_REPOSITORY')
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  // Crear un nuevo vehiculo
  async create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = this.vehiculoRepository.create(createVehiculoDto);
    return await this.vehiculoRepository.save(vehiculo);
  }

  // Obtener todos los vehiculos
  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find();
  }

  // Obtener un vehiculo por su ID
  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({ where: { id } });
    if (!vehiculo) {
      throw new NotFoundException(`vehiculo con ID ${id} no encontrado`);
    }
    return vehiculo;
  }

  // Actualizar un vehiculo existente
  async update(
    id: number,
    updateVehiculoDto: UpdateVehiculoDto,
  ): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id); // Verifica si el vehiculo existe
    this.vehiculoRepository.merge(vehiculo, updateVehiculoDto); // Fusiona los datos
    return await this.vehiculoRepository.save(vehiculo); // Guarda los cambios
  }

  // Eliminar un vehiculo
  async remove(id: number): Promise<void> {
    const vehiculo = await this.findOne(id); // Verifica si el vehiculo existe
    await this.vehiculoRepository.remove(vehiculo);
  }
}
