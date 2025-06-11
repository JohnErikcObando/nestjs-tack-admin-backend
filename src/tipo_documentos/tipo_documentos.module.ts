import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { TipoDocumentoController } from './controllers/tipo_documento.controller';
import { TipoDocumentoService } from './services/tipo_documento.service';
import { tipoDocumenotoProviders } from './providers/tipo_documento.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TipoDocumentoController],
  providers: [...tipoDocumenotoProviders, TipoDocumentoService],
  exports: [...tipoDocumenotoProviders],
})
export class TipoDocumentosModule {}
