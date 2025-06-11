import { TipoDocumento } from '@src/tipo_documentos/entities/tipo_documento.entity';
import { Viaje } from '@src/viaje/entities/viaje.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Viaje, (viaje) => viaje.documentos)
  @JoinColumn({ name: 'viaje_id' })
  viaje: Viaje;

  @Column({ name: 'viaje_id' })
  viajeId: number;

  @ManyToOne(() => TipoDocumento, (tipo) => tipo.documentos)
  @JoinColumn({ name: 'tipo_id' })
  tipoDocumento: TipoDocumento;

  @Column({ name: 'tipo_id' })
  tipoId: number;

  @Column({ length: 255 })
  link: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
