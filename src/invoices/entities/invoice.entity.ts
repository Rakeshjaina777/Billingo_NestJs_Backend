import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { InvoiceItem } from './invoice-item.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceNumber: string;

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];

  @ManyToOne(() => Shop, (shop) => shop.invoices)
  shop: Shop;

  @ManyToOne(() => User, (user) => user.invoices)
  createdBy: User;

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];
}
