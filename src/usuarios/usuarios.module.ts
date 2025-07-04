import { Module } from '@nestjs/common';

import { UsuariosService } from './services/usuarios/usuarios.service';
import { UsuariosController } from './controllers/usuarios/usuarios.controller';
import { usuarioProviders } from './providers/usuario.providers';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [...usuarioProviders, UsuariosService],
  exports: [...usuarioProviders],
})
export class UsuariosModule {}
