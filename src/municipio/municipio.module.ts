import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { MunicipiosController } from './services/municipios.controller';
import { MunicipiosService } from './services/municipios.service';
import { municipioProviders } from './providers/municipio.providers';
import { MunicipioController } from './controllers/municipio.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MunicipiosController, MunicipioController],
  providers: [...municipioProviders, MunicipiosService],
  exports: [...municipioProviders],
})
export class MunicipioModule {}
