import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceItem } from './invoice-item.entity';
import { Item } from '../items/item.entity';
import { Shop } from '../shops/shop.entity';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { User } from '../users/user.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepo: Repository<InvoiceItem>,
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(Shop) private shopRepo: Repository<Shop>,
  ) {}

  async create(dto: CreateInvoiceDto, user: User): Promise<Invoice> {
    const shop = await this.shopRepo.findOne({ where: { id: dto.shopId } });
    if (!shop) throw new NotFoundException('Shop not found');

    const invoiceItems: InvoiceItem[] = [];

    for (const entry of dto.items) {
      const item = await this.itemRepo.findOne({ where: { id: entry.itemId } });
      if (!item) throw new NotFoundException(`Item ${entry.itemId} not found`);
      if (item.stock < entry.quantity)
        throw new BadRequestException(`Insufficient stock for ${item.name}`);

      item.stock -= entry.quantity;
      await this.itemRepo.save(item);

      const total = parseFloat((item.price * entry.quantity).toFixed(2));
      const invoiceItem = this.invoiceItemRepo.create({
        item,
        quantity: entry.quantity,
        total,
      });
      invoiceItems.push(invoiceItem);
    }

    const invoice = this.invoiceRepo.create({
      user,
      shop,
      items: invoiceItems,
    });

    return this.invoiceRepo.save(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepo.find();
  }

  async findById(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }
}
