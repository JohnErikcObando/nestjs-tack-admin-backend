import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ViajeModule } from './viaje/viaje.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmpresasModule } from './empresas/empresas.module';
import { MunicipioModule } from './municipio/municipio.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { DocumentosModule } from './documentos/documentos.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { TipoDocumentosModule } from './tipo_documentos/tipo_documentos.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';

@Module({
  imports: [
    DatabaseModule,
    DepartamentoModule,
    EmpresasModule,
    MunicipioModule,
    UsuariosModule,
    ViajeModule,
    DocumentosModule,
    MovimientosModule,
    TipoDocumentosModule,
    VehiculoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
