import { Module } from '@nestjs/common';
import { DocumentoController } from './controllers/documento.controller';
import { DocumentoService } from './services/documento.service';
import { documentoProviders } from './providers/documento.providers';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentoController],
  providers: [...documentoProviders, DocumentoService],
  exports: [...documentoProviders],
})
export class DocumentosModule {}
