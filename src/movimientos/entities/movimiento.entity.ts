import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 100 })
  tipo: string;

  @Column({ length: 255 })
  descripcion: string;

  @Column('decimal', { precision: 15, scale: 2 })
  valor: number;

  @Column({ nullable: true })
  link: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
