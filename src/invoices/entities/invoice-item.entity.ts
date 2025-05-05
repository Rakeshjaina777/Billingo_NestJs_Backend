import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  invoice: Invoice;

  @ManyToOne(() => Item)
  item: Item;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @Column('decimal', { default: 0 })
  discount: number;
}
