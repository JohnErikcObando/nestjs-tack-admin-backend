import { Module } from '@nestjs/common';
import { EmpresasService } from './services/empresas.service';
import { EmpresasController } from './controllers/empresas.controller';
import { DatabaseModule } from '@src/database/database.module';
import { empresaProviders } from './providers/empresa.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmpresasController],
  providers: [...empresaProviders, EmpresasService],
  exports: [...empresaProviders],
})
export class EmpresasModule {}
