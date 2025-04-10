import { Module } from '@nestjs/common';
import { viajeProviders } from './providers/viaje.providers';
import { ViajeController } from './controllers/viaje.controller';
import { ViajeService } from './services/viaje.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ViajeController],
  providers: [...viajeProviders, ViajeService],
  exports: [...viajeProviders],
})
export class ViajeModule {}
