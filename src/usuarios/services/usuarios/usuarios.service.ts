import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUsuarioDTO,
  UpdateUsuarioDTO,
} from '@src/usuarios/dto/usuarios.dto';
import { Usuarios } from '@src/usuarios/entities/usuarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  // Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDTO): Promise<Usuarios> {
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  // Obtener todos los Usuarios
  async findAll(): Promise<Usuarios[]> {
    return await this.usuarioRepository.find();
  }

  // Obtener un viaje por su ID
  async findOne(id: number): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  // Actualizar un usuario existente
  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDTO,
  ): Promise<Usuarios> {
    const usuario = await this.findOne(id); // Verifica si el usuario existe
    this.usuarioRepository.merge(usuario, updateUsuarioDto); // Fusiona los datos
    return await this.usuarioRepository.save(usuario); // Guarda los cambios
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id); // Verifica si el usuario existe
    await this.usuarioRepository.remove(usuario);
  }
}
