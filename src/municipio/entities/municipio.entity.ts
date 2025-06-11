import { Departamento } from '@src/departamento/entities/departamento.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({ length: 10, nullable: true })
  codigo: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios, {
    nullable: false,
    onDelete: 'CASCADE', // Opcional: define el comportamiento al eliminar
  })

  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento;

  @Column({ name: 'departamento_id' }) // Columna FK en BD
  departamento_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
