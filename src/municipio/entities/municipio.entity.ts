import { Departamento } from '@src/departamento/entities/departamento.entity';
import { Viaje } from '@src/viaje/entities/viaje.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
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

  // Relación con Viajes como ORIGEN (Un municipio puede ser origen de muchos viajes)
  @OneToMany(() => Viaje, (viaje) => viaje.origen)
  viajesComoOrigen: Viaje[];

  // Relación con Viajes como DESTINO (Un municipio puede ser destino de muchos viajes)
  @OneToMany(() => Viaje, (viaje) => viaje.destino)
  viajesComoDestino: Viaje[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
