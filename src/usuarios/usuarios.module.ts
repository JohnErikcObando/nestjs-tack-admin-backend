import { Module } from '@nestjs/common';

import { UsuariosService } from './services/usuarios/usuarios.service';
import { UsuariosController } from './controllers/usuarios/usuarios.controller';
import { usuarioProviders } from './providers/usuario.providers';

@Module({
  controllers: [UsuariosController],
  providers: [...usuarioProviders, UsuariosService],
  exports: [...usuarioProviders],
})
export class UsuariosModule {}
