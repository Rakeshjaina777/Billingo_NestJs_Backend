import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './invoice.entity';
import { InvoiceItem } from './invoice-item.entity';
import { Item } from '../items/item.entity';
import { Shop } from '../shops/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, Item, Shop])],
  providers: [InvoicesService],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
