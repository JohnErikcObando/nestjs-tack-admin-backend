import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ViajeModule } from './viaje/viaje.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmpresasModule } from './empresas/empresas.module';

@Module({
  imports: [DatabaseModule, ViajeModule, UsuariosModule, EmpresasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
