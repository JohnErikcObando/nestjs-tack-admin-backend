import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { DepartamentosController } from './controllers/departamentos.controller';
import { DepartamentosService } from './services/departamentos.service';
import { departamentoProviders } from './providers/departamento.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartamentosController],
  providers: [...departamentoProviders, DepartamentosService],
  exports: [...departamentoProviders],
})
export class DepartamentoModule {}
