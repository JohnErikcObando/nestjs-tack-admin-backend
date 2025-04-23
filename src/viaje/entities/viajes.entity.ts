import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Viajes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  manifiesto: string;

  @Column()
  fecha: Date;

  @Column()
  origen: string;

  @Column()
  destino: string;

  @Column('numeric', { precision: 15, scale: 2 })
  valor: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0 })
  comision: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0, nullable: false })
  descargue: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0, nullable: false })
  cheque: number;

  @Column('numeric', { precision: 15, scale: 2 })
  total_neto: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0, nullable: false })
  porcentaje_65: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0, nullable: false })
  porcentaje_35: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0 })
  valor_anticipo: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0, nullable: false })
  saldo_a_pagar: number;

  @Column('numeric', { precision: 15, scale: 2, default: 0 })
  saldos_anticipos: number;

  @Column('boolean', { default: false })
  pago_completado: boolean;

  @Column()
  link_comprobante: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  calculatePercentages() {
    if (this.valor) {
      this.total_neto = parseFloat(
        (this.valor - this.comision - this.descargue).toFixed(2),
      );
      this.porcentaje_65 = parseFloat((this.total_neto * 0.65).toFixed(2));
      this.porcentaje_35 = parseFloat((this.total_neto * 0.35).toFixed(2));
    }

    if (this.valor_anticipo) {
      this.saldo_a_pagar = parseFloat(
        (this.valor - this.valor_anticipo).toFixed(2),
      );
      this.saldos_anticipos = parseFloat(
        (
          this.valor_anticipo -
          this.porcentaje_65 -
          this.comision -
          this.descargue
        ).toFixed(2),
      );
    }
  }
}
