import { Module } from '@nestjs/common';
import { MovimientoController } from './controllers/movimiento.controller';
import { MovimientoService } from './services/movimiento.service';
import { DatabaseModule } from '@src/database/database.module';
import { movimientoProviders } from './providers/movimiento.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MovimientoController],
  providers: [...movimientoProviders, MovimientoService],
  exports: [...movimientoProviders],
})
export class MovimientosModule {}
