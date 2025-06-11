import { Documento } from '@src/documentos/entities/documento.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tipos_documentos')
export class TipoDocumento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @OneToMany(() => Documento, (documento) => documento.tipoDocumento)
  documentos: Documento[];
}
