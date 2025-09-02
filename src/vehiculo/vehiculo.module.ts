import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { VehiculoController } from './controller/vehiculo.controller';
import { VehiculoService } from './services/vehiculo.service';
import { vehiculoProviders } from './providers/vehiculo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VehiculoController],
  providers: [...vehiculoProviders, VehiculoService],
  exports: [...vehiculoProviders],
})
export class VehiculoModule {}
