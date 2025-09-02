import { Viaje } from '@src/viaje/entities/viaje.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  placa: string;

  @Column({ length: 50 })
  marca: string;

  @Column({ length: 50 })
  modelo: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Viaje, (viaje) => viaje.vehiculo)
  viajes: Viaje[];
}
