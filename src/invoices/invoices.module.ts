import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { InvoicesResolver } from './invoices.resolver';

@Module({
  providers: [InvoicesService, InvoicesResolver],
  controllers: [InvoicesController]
})
export class InvoicesModule {}
