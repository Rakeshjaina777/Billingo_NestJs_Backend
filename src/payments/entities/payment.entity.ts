import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments)
  invoice: Invoice;

  @Column()
  method: string; // cash, card, UPI, etc.

  @Column('decimal')
  amountPaid: number;

  @Column('decimal', { default: 0 })
  due: number;
}
