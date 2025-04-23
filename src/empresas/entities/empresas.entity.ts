// src/companies/company.entity.ts
import { Viajes } from '@src/viaje/entities/viajes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Empresas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nit: string;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  celular?: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Viajes, (viaje) => viaje.empresa)
  viajes: Viajes[];
}
