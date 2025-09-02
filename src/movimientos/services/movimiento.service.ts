import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movimiento } from '../entities/movimiento.entity';
import {
  CreateMovimientoDto,
  EstadoFinancieroDto,
  UpdateMovimientoDto,
} from '../dto/movimiento.dto';

@Injectable()
export class MovimientoService {
  constructor(
    @Inject('MOVIMIENTO_REPOSITORY')
    private readonly movimientoRepository: Repository<Movimiento>,
  ) {}

  // Crear un nuevo movimiento
  async create(createMovimientoDto: CreateMovimientoDto): Promise<Movimiento> {
    const movimiento = this.movimientoRepository.create(createMovimientoDto);
    return await this.movimientoRepository.save(movimiento);
  }

  // Obtener todos los movimientos
  async findAll(): Promise<Movimiento[]> {
    return await this.movimientoRepository.find();
  }

  // Obtener un viaje por su ID
  async findOne(id: number): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id },
    });
    if (!movimiento) {
      throw new NotFoundException(`movimiento con ID ${id} no encontrado`);
    }
    return movimiento;
  }

  // Actualizar un movimiento existente
  async update(
    id: number,
    UpdateMovimientoDto: UpdateMovimientoDto,
  ): Promise<Movimiento> {
    const movimiento = await this.findOne(id); // Verifica si el movimiento existe
    this.movimientoRepository.merge(movimiento, UpdateMovimientoDto); // Fusiona los datos
    return await this.movimientoRepository.save(movimiento); // Guarda los cambios
  }

  // Eliminar un movimiento
  async remove(id: number): Promise<void> {
    const movimiento = await this.findOne(id); // Verifica si el movimiento existe
    await this.movimientoRepository.remove(movimiento);
  }

  async obtenerEstadoFinanciero(
    fechaCorte?: Date,
  ): Promise<EstadoFinancieroDto> {
    const fechaParam = fechaCorte
      ? fechaCorte.toISOString().split('T')[0]
      : null;
    const query = fechaParam
      ? `SELECT * FROM obtener_estado_financiero('${fechaParam}')`
      : 'SELECT * FROM obtener_estado_financiero(NULL)';

    const result = await this.movimientoRepository.query(query);

    return {
      total_anticipos: parseFloat(result[0]?.total_anticipos || '0'),
      total_gastos_pendientes: parseFloat(
        result[0]?.total_gastos_pendientes || '0',
      ),
      saldo_final: parseFloat(result[0]?.saldo_final || '0'),
    };
  }
}
