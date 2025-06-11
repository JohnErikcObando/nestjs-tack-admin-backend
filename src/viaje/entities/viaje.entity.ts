import { Documento } from '@src/documentos/entities/documento.entity';
import { Empresa } from '@src/empresas/entities/empresa.entity';
import { Municipio } from '@src/municipio/entities/municipio.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
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
  @Column('decimal', { precision: 15, scale: 2 })
  valor: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  comision: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  descargue: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  cheque: number;

  @Column('decimal', { precision: 15, scale: 2 })
  total_neto: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  porcentaje_65: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  porcentaje_35: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  valor_anticipo: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  saldo_a_pagar: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
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
  @ManyToOne(() => Municipio)
  @JoinColumn({ name: 'origen_id' })
  origen: Municipio;

  @Column({ name: 'origen_id' })
  origenId: number;

  // Relación con Municipio (Destino)
  @ManyToOne(() => Municipio)
  @JoinColumn({ name: 'destino_id' })
  destino: Municipio;

  @Column({ name: 'destino_id' })
  destinoId: number;

  // Relación con Documentos (Un viaje tiene muchos documentos)
  @OneToMany(() => Documento, (documento) => documento.viaje)
  documentos: Documento[];

  @BeforeInsert()
  @BeforeUpdate()
  calculateValues() {
    // Calcular total neto
    this.total_neto = parseFloat(
      (this.valor - (this.comision || 0) - (this.descargue || 0)).toFixed(2),
    );

    // Calcular porcentajes
    this.porcentaje_65 = parseFloat((this.total_neto * 0.65).toFixed(2));
    this.porcentaje_35 = parseFloat((this.total_neto * 0.35).toFixed(2));

    // Calcular saldos si hay anticipo
    if (this.valor_anticipo && this.valor_anticipo > 0) {
      this.saldo_a_pagar = parseFloat(
        (this.valor - this.valor_anticipo).toFixed(2),
      );

      this.saldos_anticipos = parseFloat(
        (
          this.valor_anticipo -
          this.porcentaje_65 -
          (this.comision || 0) -
          (this.descargue || 0)
        ).toFixed(2),
      );
    } else {
      this.saldo_a_pagar = this.valor;
      this.saldos_anticipos = 0;
    }
  }
}
