import { Documento } from '@src/documentos/entities/documento.entity';
import { Empresa } from '@src/empresas/entities/empresa.entity';
import { Municipio } from '@src/municipio/entities/municipio.entity';
import { Vehiculo } from '@src/vehiculo/entities/vehiculo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('viajes')
export class Viaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 100, unique: true })
  manifiesto: string;

  // Campos monetarios
  @Column({ type: 'integer' })
  valor: number;

  @Column({ type: 'integer' })
  comision: number;

  @Column({ type: 'integer' })
  descargue: number;

  @Column({ type: 'integer' })
  cheque: number;

  @Column({ type: 'integer' })
  total_neto: number;

  @Column({ type: 'integer' })
  porcentaje_65: number;

  @Column({ type: 'integer' })
  porcentaje_35: number;

  @Column({ type: 'integer' })
  valor_anticipo: number;

  @Column({ type: 'integer' })
  saldo_a_pagar: number;

  @Column({ type: 'integer' })
  saldos_anticipos: number;

  @Column({ default: false })
  pago_completado: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relación con Empresa
  @ManyToOne(() => Empresa, (empresa) => empresa.viajes)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column({ name: 'empresa_id' })
  empresaId: number;

  // Relación con Municipio (Origen)
  @ManyToOne(() => Municipio, (municipio) => municipio.viajesComoOrigen)
  @JoinColumn({ name: 'origen_id' })
  origen: Municipio;

  @Column({ name: 'origen_id' })
  origenId: number;

  // Relación con Municipio (Destino)
  @ManyToOne(() => Municipio, (municipio) => municipio.viajesComoDestino)
  @JoinColumn({ name: 'destino_id' })
  destino: Municipio;

  @Column({ name: 'destino_id' })
  destinoId: number;

  // Relación con Vehículo
  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.viajes)
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculo;

  @Column({ name: 'vehiculo_id' })
  vehiculoId: number;

  // Relación con Documentos (Un viaje tiene muchos documentos)
  @OneToMany(() => Documento, (documento) => documento.viaje)
  documentos: Documento[];
}
